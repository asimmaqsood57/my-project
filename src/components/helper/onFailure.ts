import { toast } from "react-toastify";
import { History } from "history";
export const onFailure = (history: History) => (error: any) => {
    if (error.response?.status === 403) {
        localStorage.clear();
        history.push("/");
    } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.detail);
    }
    else {
        toast.error(error.response?.data?.detail);
    }
};
 