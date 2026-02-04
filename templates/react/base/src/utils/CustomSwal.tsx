import Swal from "sweetalert2";

export const CustomSwal = Swal.mixin({
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#3085d6",
  confirmButtonText: "Yes",
  cancelButtonText: "No",
});
