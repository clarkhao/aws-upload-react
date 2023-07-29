//应用
import React, { useRef, useId } from "react";
//style
import style from "./Uploader.module.css";

interface IUploader {}

function Uploader({...props}: IUploader) {
  return <>
    <input type="file" className={style.input} />
  </>
}

export default Uploader;