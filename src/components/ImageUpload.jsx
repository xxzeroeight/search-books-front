import { useEffect, useRef, useState } from "react";
import { imageUpload } from "../services/api";
import "../styles/ImageUpload.css";
import { useNavigate } from "react-router-dom";
import { formatFileSize, setPageTitle } from "../utils/utils";
import { MAX_FILE_SIZE } from "../utils/constants";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  // 페이지 제목
  useEffect(() => {
    setPageTitle("이미지 업로드");
  }, []);

  // 파일 선택 처리
  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) return ;

    // 파일 타입 검증
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("JPG, PNG, JPEG 파일만 업로드 가능합니다.");
      return ;
    }

    // 파일 크기 검증 (5MB 제한)
    const maxSize = MAX_FILE_SIZE;
    if (file.size > maxSize) {
      setError("파일 크기는 5MB를 초과할 수 없습니다.");
      return ;
    }

    setError(null);
    setSelectedFile(file);

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // FormData 방식으로 업로드
  const uploadWithFormData = async () => {
    if (!selectedFile) return ;

    setUploading(true);
    setError(null);

    try {
      const response = await imageUpload.upload(selectedFile);

      if (response.success) {
        setUploadResult(response.book);
        console.log("업로드 성공:", response.book);

        navigate("/upload-success", {
          state: {
            uploadResult: response.book,
            fileName: selectedFile.name,
            fileSize: formatFileSize(selectedFile.size),
            fileType: selectedFile.type,
          }
        });
      }
    } catch (err) {
      setError(err.message || "업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  // 완전 초기화
  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadResult(null);
    setError(null);
    
    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container">
      <h2 className="image-upload-title">이미지 업로드</h2>

      {/* 파일 선택 영역 */}
      <div className="upload-area">
        <input
          ref={fileInputRef}
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />

        {!selectedFile ? (
          <label htmlFor="imageInput" className="upload-content">
            <span className="upload-icon">📁</span>
            <p className="upload-text">클릭하거나 파일을 드래그해서 업로드</p>
            <p className="uplaad-hint">JPG, PNG, JPEG (최대 5MB)</p>
          </label>
        ) : (
          <div className="preview-container">
            <img src={previewUrl} alt="미리보기" className="preview-image"/>
            <div className="file-info">
              <p className="file-info-item"><strong>파일명:</strong> {selectedFile.name}</p>
              <p className="file-info-item"><strong>크기:</strong> {formatFileSize(selectedFile.size)}</p>
              <p className="file-info-item"><strong>타입:</strong> {selectedFile.type}</p>
            </div>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {/* 업로드 성공 메시지 */}
      {uploadResult && (
        <div className="success-message">
          업로드 성공!
          {uploadResult.imageUrl && (
            <div>
              <p>이미지 URL: <a href={uploadResult.imageUrl} target="_blank" rel="noopener noreferrer" className="success-link">보기</a></p>
            </div>
          )}
        </div>
      )}

      {/* 버튼 */}
      <div className="button-container">
        <button onClick={uploadWithFormData} disabled={!selectedFile || uploading} className="upload-button primary-button">
          {uploading ? "업로드 중..." : "업로드"}
        </button>

        <button 
          onClick={resetUpload}
          disabled={uploading}
          className="upload-button reset-button"
        >
          초기화
        </button>
      </div>

      {/* 업로드 진행률 표시 */}
      {uploading && (
        <div className="loading-container">
          <p>이미지를 업로드하는 중...</p>
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;