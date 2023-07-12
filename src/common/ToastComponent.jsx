export const notify = (message, type, toast) => {
    const toastProps = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }

    if (type == "success") {
        toast.success(message, toastProps);
    } else if (type == "info") {
        toast.info(message, toastProps);
    } else if (type == "warning") {
        toast.warning(message, toastProps);
    } else if (type == "error") {
        toast.error(message, toastProps);
    } else {
        toast(message, toastProps);
    }
}