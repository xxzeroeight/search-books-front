import { useLocation, useNavigate } from "react-router-dom";
import "../styles/UploadSuccess.css";
import { useEffect } from "react";
import { setPageTitle } from "../utils/utils";

const UploadSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { uploadResult, fileName, fileSize, fileType } = location.state || {};

    // 페이지 제목
    useEffect(() => {
        setPageTitle("업로드 성공");
    }, []);

    const getImageUrl = (imageUrl) => {
        if (!imageUrl || imageUrl.trim() === '') {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjgiIGZpbGw9IiNFMEUwRTAiLz4KPGNpcmNsZSBjeD0iMTc1IiBjeT0iMTI1IiByPSIxNSIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNMTYwIDE2MEM1IDE2NSAxNzAgMTc1IDE4NSAxNjVDMjAwIDE1NSAyMTAgMTY1IDIyNSAxNjBMMjQwIDE4MEgxNjBWMTYwWiIgZmlsbD0iI0NDQ0NDQyIvPgo8dGV4dCB4PSIyMDAiIHk9IjIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij7snbTrr7jsp4DqsIAg7JeG7Iq164uI64ukLjwvdGV4dD4KPC9zdmc+';
        }
        return imageUrl;
    };

    if (!uploadResult) {
        return (
            <div className="upload-success-container">
                <div className="error-content">
                    <h2>❌ 잘못된 접근입니다.</h2>

                    <p>업로된 파일 정보를 찾을 수 없습니다.</p>
                    <button onClick={() => navigate("/")} className="btn-primary">홈으로 돌아가기</button>
                </div>
            </div>
        );
    }

    return (
        <div className="upload-success-container">

            {/* 업로드된 이미지 미리보기 */}
            <div className="image-preview-section">
                <h2>이미지</h2>

                <div className="image-container">
                    <img src={getImageUrl(uploadResult.imageUrl)} alt="업로드된 이미지" className="uploaded-image" />
                </div>
            </div>

            {/* 파일 정보 */}
            <div className="file-info-section">
                <h3>도서 정보</h3>

                <div className="info-grid">
                    {uploadResult.title && (
                        <div className="info-item">
                        <span className="info-label">제목</span>
                        <span className="info-value">{uploadResult.title} {uploadResult.subtitle && `(${uploadResult.subtitle})`}</span>
                        </div>
                    )}
                    {uploadResult.publisher && (
                        <div className="info-item">
                        <span className="info-label">출판사</span>
                        <span className="info-value">{uploadResult.publisher}</span>
                        </div>
                    )}
                    {uploadResult.publishedDate && (
                        <div className="info-item">
                        <span className="info-label">출판일</span>
                        <span className="info-value">{uploadResult.publishedDate}</span>
                        </div>
                    )}
                    {uploadResult.isbn && (
                        <div className="info-item">
                        <span className="info-label">ISBN</span>
                        <span className="info-value">{uploadResult.isbn}</span>
                        </div>
                    )}
                    {uploadResult.description && (
                        <div className="info-item">
                        <span className="info-label">설명</span>
                        <span className="info-value">{uploadResult.description}</span>
                        </div>
                    )}
                    {uploadResult.category && (
                        <div className="info-item">
                        <span className="info-label">카테고리</span>
                        <span className="info-value">{uploadResult.category}</span>
                        </div>
                    )}
                    {uploadResult.pageCount > 0 && (
                        <div className="info-item">
                        <span className="info-label">총 페이지</span>
                        <span className="info-value">{uploadResult.pageCount}쪽</span>
                        </div>
                    )}
                    {uploadResult.language && (
                        <div className="info-item">
                        <span className="info-label">언어</span>
                        <span className="info-value">{uploadResult.language}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* 파일 정보 */}
            <div className="file-info-section">
                <h3>파일 정보</h3>
                <div className="info-grid">
                <div className="info-item">
                    <span className="info-label">파일 이름</span>
                    <span className="info-value">{fileName || 'N/A'}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">파일 크기</span>
                    <span className="info-value">{fileSize}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">파일 타입</span>
                    <span className="info-value">{fileType || 'N/A'}</span>
                </div>
                </div>
            </div>

            {/* 이미지 복사 */}
            {uploadResult.imageUrl && (
                <div className="url-info-section">
                    <h2>이미지 URL</h2>

                    <div className="url-container">
                        <input type="text"
                            value={uploadResult.imageUrl}
                            readOnly
                            className="url-input"
                        />
                        <button className="copy-btn"
                            onClick={() => {
                                navigator.clipboard.writeText(uploadResult.imageUrl);
                                alert("이미지 URL이 클립보드에 복사되었습니다.");
                            }}
                        >
                            URL 복사
                        </button>
                    </div>
                </div>
            )}


            {/* 버튼 */}
            <div className="action-buttons">
                <button onClick={() => navigate("/")} className="btn-secondary">
                    홈으로 돌아가기
                </button>

                {uploadResult.imageUrl && (
                    <button onClick={() => window.open(uploadResult.imageUrl, "_blank")} className="btn-primary">
                        이미지 새 탭에서 열기
                    </button>
                )}
            </div>
        </div>
    );
};

export default UploadSuccess;