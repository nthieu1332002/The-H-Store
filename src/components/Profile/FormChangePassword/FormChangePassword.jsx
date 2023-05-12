import React from "react";
import { getAuth, updatePassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
import { toast } from "react-toastify";
import { BsShieldFillExclamation, BsShieldFillCheck } from "react-icons/bs";

const FormChangePassword = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitChangePassword = async (data) => {
    updatePassword(currentUser, data.newPassword)
      .then(() => {
        toast.success("Change password successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Change password failed!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitChangePassword)}>
      <div className="form-item">
        <input
          id="newPassword"
          type="password"
          {...register("newPassword")}
          placeholder="New password"
        />
        <div
          className={
            "message " + (errors.newPassword?.message ? "invalid" : "valid")
          }
        >
          <p>
            {errors.newPassword?.message ? (
              <BsShieldFillExclamation />
            ) : (
              <BsShieldFillCheck />
            )}
            New password is required and at least 6 characters.
          </p>
        </div>
      </div>
      <div className="form-item">
        <input
          name="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm your password"
        />
        <div
          className={
            "message " + (errors.confirmPassword?.message ? "invalid" : "valid")
          }
        >
          <p>
            {errors.confirmPassword?.message ? (
              <BsShieldFillExclamation /> 
            ) : (
              <BsShieldFillCheck /> 
            )}
            Confirm password should be matched.
          </p>
        </div>
      </div>
      <div className="btn">
        <button type="submit">Save changes</button>
      </div>
    </form>
  );
};

export default FormChangePassword;
