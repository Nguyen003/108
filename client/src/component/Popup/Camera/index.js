import classNames from "classnames/bind";
import styles from "./Camera.module.scss"

const cx = classNames.bind(styles);

function CameraPopup({ imageSrc }) {
    return (
        <div className="modal fade" id="cameraModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="w-100 h-100 ">
                            <img src={imageSrc} alt="ảnh" className={`img-fluid ${cx("camera")}`} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="position-absolute top-0 end-0 text-light p-2 cursor-pointer">
                <i className="fa fa-times fs-1" aria-hidden="true" data-bs-dismiss="modal"></i>
            </div>
        </div>
    )
}

export default CameraPopup;