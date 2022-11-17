import "./imgcss.css"

const ImageConvert = ({ setImage ,getImage}) => {
  function imageUploaded(file) {
    var reader = new FileReader();
    // console.log("next");
    let base64String;
    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setImage(base64String);
    };
    reader.readAsDataURL(file);
  }
  return (
      <div className="uploadContainer">
          {getImage != null ? (
              <img src={`data:image/png;base64,${getImage}`}/>) : ""}
          
          <span className="profile">{getImage === null ? "Profile picture" : ""}</span>
          
      <input
        type="file"
        name="imgUpload"
        id="imgUpload"
        className="upload"
        onChange={(e) => imageUploaded(e.target.files[0])}
      />
      <label className="mylabel" htmlFor="imgUpload"> Choose Image</label>
    </div>
  );
};

export default ImageConvert;
