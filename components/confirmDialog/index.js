import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React from "react";

export default function ConfirmDialog ({open, onClose, onConfirm}) {
    return <Dialog open={open} onClose={onClose}>
        <div className="flex flex-center flex-col p-10 items-center truncate">
            <p>آیا اطمینان دارید؟</p>
            <div className="flex justify-center items-center ">
                <Button
                    sx={{ margin: 1 }}
                    variant="contained"
                    onClick={onConfirm}
                >
                    بله
                </Button>
                <Button
                    sx={{ margin: 1 }}
                    onClick={onClose}
                    autoFocus
                >
                    خیر
                </Button>
            </div>
        </div>
    </Dialog>
}