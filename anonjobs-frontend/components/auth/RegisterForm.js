import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Alert from "../../libs/alerts/Index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { register as registration } from "../../store/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("The email field is required.")
      .email("The email must be a valid email address."),
    password: Yup.string()
      .required("The password field is required.")
      .min(8, "The password must be at least 8 characters."),
    password_confirmation: Yup.string().required(
      "The retype password field is required."
    ),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm(formOptions);

  const submitForm = async (data) => {
    const redirectPath = '/login';

    await dispatch(registration(data))
      .unwrap()
      .then((response) => {
        Alert.success(response.message);
        router.replace(redirectPath);
      })
      .catch((error) => {
        if (error.status === 422) {
          const errors = error.data.errors;
          Object.keys(errors).forEach((field) => {
            const message = errors[field];
            setError(field, {
              type: "server",
              message: message[0],
            });
          });
        } else {
          Alert.error(error.status, error.data.message);
        }
      });
  };
  return (
    <form
      className="p-4 border bg-black base-form"
      method="post"
      onSubmit={handleSubmit(submitForm)}
      autoComplete="off"
    >
      <div className="form-floating mt-3">
        <input
          className="form-control mt-3 bg-black"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <label htmlFor="email">Email</label>
        <span className="text-danger">
          {errors.email && errors.email.message}
        </span>
      </div>
      <div className="form-floating mt-3">
        <input
          className="form-control mt-3 bg-black"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <label htmlFor="password">Password</label>
        <span className="text-danger">
          {errors.password && errors.password.message}
        </span>
      </div>
      <div className="form-floating mt-3">
        <input
          className="form-control mt-3 bg-black"
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          placeholder="Enter your password again"
          {...register("password_confirmation")}
        />
        <label htmlFor="password">Retype Password</label>
        <span className="text-danger">
          {errors.password_confirmation && errors.password_confirmation.message}
        </span>
      </div>
      <button
        type="submit"
        value="Submit"
        className="w-100 mt-3 my-btn-primary-maximum mt-4 submit-button"
      >
        {status === "pending" && <i className="fa fa-spinner fa-spin me-2"></i>}
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
