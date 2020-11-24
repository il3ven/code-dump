const checkClipPermission = async () => {
  const queryOpts = { name: "clipboard-read", allowWithoutGesture: true };
  return navigator.permissions.query(queryOpts);
};

export { checkClipPermission };
