///
/// Image
///

interface Props {
  image: string; 
};

const Image = ({ image }: Props) => {
  const src = new URL(`../images/${image}`, import.meta.url).href;
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "16px auto", width: "100%" }}>
      <div 
        className="splash-image transparent" 
        style={{ 
          maxWidth: "90%", 
          borderRadius: "12px", 
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <img
          src={src}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "12px",
            objectFit: "cover"
          }}
          alt="Imagen Macondian"
        />
      </div>
    </div>
  );
};

export default Image;