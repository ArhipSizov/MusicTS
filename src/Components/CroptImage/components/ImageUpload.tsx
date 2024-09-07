import { useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import { getStorage, ref, uploadString } from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "cropperjs/dist/cropper.css";
import "./styles/imageupload.css";

interface IMGProps {
  setCroppedImage: (value: string) => void;
  setOriginalImage: (value: string) => void;
  round?: boolean;
  width?: number;
  aspect: number;
  color?: string;
  sizeLimit?: number;
}

const ImageUpload = (props: IMGProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const userArr = useSelector((state: any) => state.user.user);
  if (email == "") {
    userArr.forEach((element: any) => {
      setEmail(element.email);
    });
  }

  const storage = getStorage();
  const storageRef = ref(storage, email);

  const [fileInput, setFileInput] = useState<any>();
  const [hasInput, setHasInput] = useState(false);
  const [croppedImage, setCroppedImage] = useState<any>();
  const [fileName, setFileName] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);
  const cropperRef = useRef<any>(null);

  function getBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setFileInput(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };

    return reader.result;
  }

  const handleFile = async (e: any) => {
    const file = e.currentTarget.files[0];
    if (props.sizeLimit && file.size > props.sizeLimit) {
      setStatusMessage("Размер файла больше 500кб");
    } else {
      setFileName(file.name);
      getBase64(file);
    }
  };

  const clearFileInput = () => {
    setHasInput(false);
    setFileInput(null);
    setCroppedImage(null);
    setFileName("");
  };

  const saveImage = () => {
    // props.setCroppedImage(croppedImage);
    // props.setOriginalImage(fileInput);
    // setStatusMessage("Image Saved Successfully");

    setStatusMessage("Подождите немного...");
    const message4 = croppedImage;

    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      navigate("/profile");
    });
  };

  const dropHandler = (ev: any) => {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (
          item.kind === "file" &&
          (item.type === "image/png" ||
            item.type === "image/gif" ||
            item.type === "image/jpg" ||
            item.type === "image/jpeg")
        ) {
          const file = item.getAsFile();
          if (props.sizeLimit && file.size > props.sizeLimit) {
            setStatusMessage("Размер файла больше 500кб");
          } else {
            console.log(`… file[${i}].name = ${file.name}`);
            setFileName(file.name);
            getBase64(file);
          }
        } else {
          setStatusMessage("Неверный тип файла.");
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  };

  const dragOverHandler = (ev: any) => {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  };

  useEffect(() => {
    setHasInput(fileInput !== null);
    showEditor();
  }, [fileInput]);

  useEffect(() => {
    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  }, [statusMessage]);

  const showEditor = () => {
    if (fileInput) dialogRef.current?.showModal();
  };

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    dialogRef.current?.close();
  };

  return (
    <div>
      {croppedImage && (
        <div id="img-display">
          {/* <div id="clear-button" onClick={() => {clearFileInput()}}>𐌢</div> */}
          <img
            className="img_cropt"
            id={props.round ? "round" : ""}
            src={croppedImage}
          />
          <div id="options-row" style={{ width: props.width || 375 + "px" }}>
            {/* <button id="edit-button" onClick={showEditor}>Edit</button> */}
            <button
              id="save-button"
              style={{
                backgroundColor: props.color ? props.color : "dodgerblue",
              }}
              onClick={() => saveImage()}
            >
              Сохранить
            </button>
          </div>
        </div>
      )}
      <div
        id="drop-zone"
        style={{ borderColor: props.color ? props.color : "dodgerblue" }}
        onDrop={() => dropHandler(event)}
        onDragOver={() => dragOverHandler(event)}
      >
        <p id="drop-label">Изменить аватар</p>
        <input
          id="image-input"
          style={{ width: props.width || 250 + "px" }}
          type="file"
          accept=".png,.jpg,.jpeg,.gif"
          onInput={(e) => {
            handleFile(e);
          }}
        />
      </div>
      {statusMessage && <p id="status-msg">{statusMessage}</p>}
      <dialog ref={dialogRef} id="editor">
        <div id={props.round ? "round" : "rect"}>
          <Cropper
            src={fileInput}
            style={{ height: 500, width: 331 }}
            initialAspectRatio={props.aspect}
            aspectRatio={props.aspect}
            guides={false}
            ref={cropperRef}
          />
        </div>
        <div id="editor-button-row">
          <button id="crop-button" onClick={onCrop}>
            Crop
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ImageUpload;
