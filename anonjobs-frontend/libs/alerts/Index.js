import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

let Alert = {
  success(message) {
    Toast.fire({
      icon: "success",
      title: message,
    });
  },
  error(code, message) {
    if (code === 422 || code === 401) {
      Toast.fire({
        icon: "error",
        title: message,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Something went wrong! Please try again.",
      });
    }
  },
};

export default Alert;
