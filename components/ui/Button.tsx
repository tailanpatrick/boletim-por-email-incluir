import { MouseEventHandler } from "react";

type ButtonProps = {
    onClick: MouseEventHandler;
    loading?: boolean;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";  
};

const Button = ({ onClick, loading, children, type = "button" } : ButtonProps) => {
    return (
        <button
            type={type} 
            onClick={onClick}
            disabled={loading}
            className={`mt-3 px-6 py-2 rounded-md text-white ${
                loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-400 hover:bg-orange-300"
            } shadow-lg border border-gray-300`}
        >
            {children}
        </button>
    );
};

export default Button;
