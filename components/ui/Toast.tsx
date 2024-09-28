import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (text: string) => {
    toast.success(text, {
        style: { fontWeight: 'bold' },
        position: "top-right",
        autoClose: 5000,
    });
}

export const toastError = (text: string) => {
    toast.error(text, {
        style: { fontWeight: 'bold' },
        position: "top-right",
        autoClose: 5000,
    });
}

export const toastLoading = (text: string) => {
    toast.loading(text, {
        style: { fontWeight: 'bold' },
        position: "top-right",
    });
}

export const toastDismiss = () => {
    toast.dismiss();
}