import Swal from "sweetalert2";

const showSuccessDialog = (message) =>
  Swal.fire({
    icon: "success",
    title: "success",
    text: message,
    timer: 1500,
    timerProgressBar: true,
  });

const showErrorDialog = (message) =>
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });

const showQuestion = (message) =>
  Swal.fire({
    title: "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, proceed!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    return result.isConfirmed; // Returns true if confirmed, false otherwise
  });

const ShowLoading = (message?: string) =>
  Swal.fire({
    title: "Loading...",
    text: message || "Please wait...",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => Swal.showLoading(),
  });

const CloseLoading = () => Swal.close(); // Close SweetAlert modal

const dialogs = {
  error: showErrorDialog,
  success: showSuccessDialog,
  question: showQuestion,
  load: ShowLoading,
  closeLoad: CloseLoading,
};

export { dialogs };
