///
/// Image
///

interface Props {
  image: string;
}

const Image = ({ image }: Props) => {
  const src = new URL(`../images/${image}`, import.meta.url).href;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "16px", width: "100%" }}>
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          border: "1px solid rgba(229, 231, 235, 0.8)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          maxWidth: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 20px 30px -10px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.15)";
        }}
      >
        <img
          src={src}
          alt={image}
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            maxHeight: "500px",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

export default Image;