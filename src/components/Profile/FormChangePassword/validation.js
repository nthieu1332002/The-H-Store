import * as yup from "yup";

export const schema = yup
    .object({
        newPassword: yup
            .string()
            .required(" * New password is required.")
            .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự."),
        confirmPassword: yup
            .string()
            .required(" * Confirm password is required.")
            .oneOf([yup.ref("newPassword"), null], " * Not match."),
    })
    .required();
