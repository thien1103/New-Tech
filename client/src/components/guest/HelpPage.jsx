
  const HelpPage = (props) => {
    const { bg } = props;

    
    return (
      <div
        className="flex flex-col"
        style={{
          padding: 24,
          minHeight: 360,
          background: bg,
        }}
      >
        Bỏ hình ảnh hướng dẫn vào đây
      </div>
    );
  };
  
  export default HelpPage;
  