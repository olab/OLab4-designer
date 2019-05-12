const resizeNode = (id, width, heigth) => {
  const newWidth = this.resizeRef.current.offsetWidth;
  const newHeight = this.resizeRef.current.offsetHeight;

  if (newWidth !== width || newHeight !== height) {
    onNodeResize(id, newWidth, newHeight);
  }
};

export default resizeNode;
