import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import formData from "../../data/formData";
import selectStyle from "../../js/selectStyle";
import { useDispatch, useSelector } from "react-redux";
import { storeJob, updateJob } from "../../store/jobs/job.action";
import Alert from "../../libs/alerts/Index";
import { useRouter } from "next/router";
import ImageUploading from "react-images-uploading";
import Editor from "../../libs/editor/Index";

const JobForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tag);
  const { yearlySalaries } = useSelector((state) => state.yearlySalary);
  const { status, job } = useSelector((state) => state.job);
  const [highlightColorDisable, setHighlightColorDisable] = useState(true);

  const [editorLoaded, setEditorLoaded] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState([]);

  const { jobId } = router.query;
  const isAddMode = !jobId;

  const formSchema = Yup.object().shape({
    company: Yup.string().required("The company or project field is required."),
    position: Yup.string().required("The position field is required."),
    type: Yup.string().required("The type field is required."),
    is_anon: Yup.string().required("The is anon friendly field is required."),
    is_remote: Yup.string().required(
      "The is remote friendly field is required."
    ),
    tags: Yup.array()
      .required("The tags field is required.")
      .min(1, "The tags must have at least 1 items.")
      .max(5, "The tags must not have more than 5 items."),
    location: Yup.string().required("The location field is required."),
    description: Yup.string().required("The description field is required."),
    how_to_apply: Yup.string().required("The how to apply field is required."),
    apply_url_or_email: Yup.string().required(
      "The apply url or email field is required."
    ),
    min_yearly_salary: Yup.string().required(
      "The min yearly salary field is required."
    ),
    max_yearly_salary: Yup.string()
      .required("The max yearly salary field is required.")
      .when(
        "min_yearly_salary",
        (min_yearly_salary, schema, max_yearly_salary) => {
          return schema.test(
            "min-max-compatible",
            "The max yearly salary must be greater than or equal to min yearly salary.",
            (value) => {
              return value >= min_yearly_salary ? true : false;
            }
          );
        }
      ),
    is_crypto_salary: Yup.string().required(
      "The is crypto salary field is required."
    ),
    crypto_salary_type: Yup.string().when(
      "is_crypto_salary",
      (value, schema) => {
        if (value === "Yes")
          return Yup.string().required("The crypto salary field is required.");
        else return Yup.string().notRequired();
      }
    ),
    company_full_name: Yup.string().nullable(),
    company_full_address: Yup.string().nullable(),
    company_vat_or_tax_no: Yup.string().nullable(),
    company_twitter: Yup.string().nullable(),
    coupon_code: Yup.string().nullable(),
    // pin_duration: Yup.number().required("The pin duration field is required."),
    // job_highlight_color_type: Yup.string().required(
    //   "The job highlight color type field is required."
    // ),
    // job_higlight_color: Yup.string().when(
    //   "job_highlight_color_type",
    //   (value, schema) => {
    //     if (value === "Yes")
    //       return Yup.string().required(
    //         "The job highlight color field is required."
    //       );
    //     else return Yup.string().notRequired();
    //   }
    // ),
    // enable_message_to_discord: Yup.string().required(
    //   "The enbale message to discord field is required."
    // ),
    // enable_email_to_subcribers: Yup.string().required(
    //   "The enbale email to subscribers field is required."
    // ),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  if (!isAddMode) {
    formOptions.defaultValues = job;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    control,
    setError,
  } = useForm(formOptions);

  useEffect(() => {
    register("description");
    register("how_to_apply");
    setEditorLoaded(true);
  }, [register, isAddMode, job]);

  const submitForm = (data) => {
    data.company_logo =
      selectedCompanyLogo && selectedCompanyLogo[0]
        ? selectedCompanyLogo[0].data_url
        : null;
    data.tags = selectedTags.length > 0 ? selectedTags : job.tag_ids;
    data.pin_duration = 0;
    data.job_highlight_color_type="No";
    data.job_higlight_color="#000000";
    data.enable_message_to_discord="No";
    data.enable_email_to_subcribers="No";
    return isAddMode ? createPost(data) : updatePost(data);
  };

  const createPost = async (data) => {
    await dispatch(storeJob(data))
      .unwrap()
      .then((response) => {
        Alert.success(response.message);
        router.push(`/jobs/show/${response.position_slug}/${response.job_id}`);
      })
      .catch((error) => {
        if (error.status === 401) {
          router.push("/login");
        } else {
          const errors = error.data ? error.data.errors : [];
          Object.keys(errors).forEach((field) => {
            const message = errors[field];
            setError(field, {
              type: "server",
              message: message[0],
            });
          });
          if (error.data && error.data.message) {
            Alert.error(error.status, error.data.message);
          }
        }
      });
  };
  const updatePost = async (data) => {
    data.id = jobId;
    await dispatch(updateJob(data))
      .unwrap()
      .then((response) => {
        Alert.success(response.message);
        router.push(`/jobs/show/${response.position_slug}/${response.job_id}`);
      })
      .catch((error) => {
        if (error.status === 401) {
          router.push("/login");
        } else {
          const errors = error.data ? error.data.errors : [];
          Object.keys(errors).forEach((field) => {
            const message = errors[field];
            setError(field, {
              type: "server",
              message: message[0],
            });
          });
          if (error.data && error.data.message) {
            Alert.error(error.status, error.data.message);
          }
        }
      });
  };
  return (
    <div className="content-section content-section-border pb-5">
      <div className="my-wrapper mx-auto">
        <header className="py-5 text-center">
          <h1 className="fw-bold fs-2 ft-5 text-grey">
            {isAddMode ? "Post Job" : "Edit Job Post"}
          </h1>
        </header>
        <div className="p-2 p-md-0">
          <form
            className="p-4 border bg-black base-form"
            method="post"
            onSubmit={handleSubmit(submitForm)}
            autoComplete="off"
            encType="multipart/form-data"
          >
            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="company"
                name="company"
                type="text"
                placeholder="Company"
                {...register("company")}
              />
              <label htmlFor="company">Company or Project</label>
              <span className="text-danger">
                {errors.company && errors.company.message}
              </span>
            </div>

            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="position"
                name="position"
                type="text"
                placeholder="Position"
                {...register("position")}
              />
              <label htmlFor="position">Position</label>
              <span className="text-danger">
                {errors.position && errors.position.message}
              </span>
            </div>

            <div className="mt-3">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={formData.jobTypes}
                    styles={selectStyle}
                    value={formData.jobTypes.find(
                      (c) => c.value === field.value
                    )}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption.value);
                    }}
                    placeholder="Select Types"
                    id="job-types"
                    instanceId="job-types"
                    inputId="job-types"
                  />
                )}
              />
              <span className="text-danger">
                {errors.type && errors.type.message}
              </span>
            </div>
            <div className="mt-3">
              <div className="d-flex">
                <Controller
                  name="is_anon"
                  control={control}
                  render={({ field }) => (
                    <div className="d-flex">
                      <label>Anon Friendly? </label>
                      {formData.typesYesNo.map((type, index) => (
                        <div className="ps-2 mb-2" key={index}>
                          <input
                            {...field}
                            className="form-check-input"
                            type="radio"
                            value={type}
                            name="is_anon"
                            id={`is_anon[${index}]`}
                            defaultChecked={
                              field.value === type
                                ? true
                                : index === 0
                                ? true
                                : false
                            }
                            {...register("is_anon")}
                          />
                          <label htmlFor={`is_anon[${index}]`}>
                            &nbsp;{type}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
              <span className="text-danger">
                {errors.is_anon && errors.is_anon.message}
              </span>
            </div>
            <div className="mt-3">
              <div className="d-flex">
                <Controller
                  name="is_remote"
                  control={control}
                  render={({ field }) => (
                    <div className="d-flex">
                      <label>Remote Friendly? </label>
                      {formData.typesYesNo.map((type, index) => (
                        <div className="ps-2 mb-2" key={index}>
                          <input
                            {...field}
                            className="form-check-input"
                            type="radio"
                            value={type}
                            name="is_remote"
                            id={`is_remote[${index}]`}
                            defaultChecked={
                              field.value === type
                                ? true
                                : index === 0
                                ? true
                                : false
                            }
                            {...register("is_remote")}
                          />
                          <label htmlFor={`is_remote[${index}]`}>
                            &nbsp;{type}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
              <span className="text-danger">
                {errors.is_remote && errors.is_remote.message}
              </span>
            </div>

            <div className="mt-3">
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={tags}
                    styles={selectStyle}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      setSelectedTags(
                        Array.isArray(selectedOption)
                          ? selectedOption.map((c) => c.value)
                          : []
                      );
                      trigger("tags");
                    }}
                    defaultValues={field.value}
                    placeholder="Select Tags"
                    isMulti
                    id="job-tags"
                    instanceId="job-tags"
                    inputId="job-tags"
                  />
                )}
              />
              <small className="mt-3 text-muted">
                Multiple Tags can be selected
              </small>
              <br />
              <span className="text-danger">
                {errors.tags && errors.tags.message}
              </span>
            </div>

            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="location"
                name="location"
                type="text"
                placeholder="Location"
                {...register("location")}
              />
              <label htmlFor="location">Location</label>
              <small className="mt-3 text-muted">
                Worldwide or City, Country
              </small>
              <br />
              <span className="text-danger">
                {errors.location && errors.location.message}
              </span>
            </div>
            <div className="form-floating mt-3">
              <Editor
                name="description"
                placeholder="Description"
                value={job ? job.description : ""}
                onChange={(data) => {
                  setValue("description", data);
                  trigger("description");
                }}
                editorLoaded={editorLoaded}
              />
              <span className="text-danger">
                {errors.description && errors.description.message}
              </span>
            </div>
            <div className="form-floating mt-3">
              <Editor
                name="how_to_apply"
                placeholder="How to apply"
                value={job ? job.how_to_apply : ""}
                onChange={(data) => {
                  setValue("how_to_apply", data);
                  trigger("how_to_apply");
                }}
                editorLoaded={editorLoaded}
              />
              <span className="text-danger">
                {errors.how_to_apply && errors.how_to_apply.message}
              </span>
            </div>

            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="apply_url_or_email"
                name="apply_url_or_email"
                type="text"
                placeholder="Apply URL or Email"
                {...register("apply_url_or_email")}
              />
              <label htmlFor="apply_url_or_email">Apply URL or Email</label>
              <span className="text-danger">
                {errors.apply_url_or_email && errors.apply_url_or_email.message}
              </span>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <Controller
                  name="min_yearly_salary"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="me-2"
                      {...field}
                      options={yearlySalaries}
                      styles={selectStyle}
                      value={yearlySalaries.find(
                        (c) => c.value === field.value
                      )}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.value);
                        trigger("min_yearly_salary");
                        trigger("max_yearly_salary");
                        setValue("min_yearly_salary", selectedOption.value);
                      }}
                      placeholder="Select Min Salary"
                      id="job-min-salary"
                      instanceId="job-min-salary"
                      inputId="job-min-salary"
                    />
                  )}
                />
                <span className="text-danger">
                  {errors.min_yearly_salary && errors.min_yearly_salary.message}
                </span>
              </div>
              <div className="col-md-6">
                <Controller
                  name="max_yearly_salary"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={yearlySalaries}
                      styles={selectStyle}
                      value={yearlySalaries.find(
                        (c) => c.value === field.value
                      )}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.value);
                        trigger("max_yearly_salary");
                        trigger("min_yearly_salary");
                        setValue("max_yearly_salary", selectedOption.value);
                      }}
                      placeholder="Select Max Salary"
                      id="job-max-salary"
                      instanceId="job-max-salary"
                      inputId="job-max-salary"
                    />
                  )}
                />
                <span className="text-danger">
                  {errors.max_yearly_salary && errors.max_yearly_salary.message}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Controller
                name="is_crypto_salary"
                control={control}
                render={({ field }) => (
                  <div className="d-flex">
                    <label>Is Crypto Salary? </label>
                    {formData.typesYesNo.map((type, index) => (
                      <div className="ps-2 mb-2" key={index}>
                        <input
                          {...field}
                          className="form-check-input"
                          type="radio"
                          value={type}
                          name="is_crypto_salary"
                          id={`is_crypto_salary[${index}]`}
                          defaultChecked={
                            field.value === type
                              ? true
                              : index === 0
                              ? true
                              : false
                          }
                          {...register("is_crypto_salary")}
                        />
                        <label htmlFor={`is_crypto_salary[${index}]`}>
                          &nbsp;{type}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
              <span className="text-danger">
                {errors.is_crypto_salary && errors.is_crypto_salary.message}
              </span>
            </div>
            <div className="mt-3">
              <Controller
                name="crypto_salary_type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={formData.jobCryptoSalaryTypes}
                    styles={selectStyle}
                    value={formData.jobCryptoSalaryTypes.find(
                      (c) => c.value === field.value
                    )}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption.value);
                    }}
                    placeholder="Select Crypto Salary Type"
                    id="job-crypto-salary-type"
                    instanceId="job-crypto-salary-type"
                    inputId="job-crypto-salary-type"
                  />
                )}
              />
              <span className="text-danger">
                {errors.crypto_salary_type && errors.crypto_salary_type.message}
              </span>
            </div>
            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="company_full_name"
                name="company_full_name"
                type="text"
                placeholder="Company's full name (for invoice)"
                {...register("company_full_name")}
              />
              <label htmlFor="company_full_name">
                Company&apos;s full name
              </label>
              <small className="mt-3 text-muted">For invoice</small>
              <br />
              <span className="text-danger">
                {errors.company_full_name && errors.company_full_name.message}
              </span>
            </div>
            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="company_full_address"
                name="company_full_address"
                type="text"
                placeholder="Company's full address (for invoice)"
                {...register("company_full_address")}
              />
              <label htmlFor="company_full_address">
                Company&apos;s full address
              </label>
              <small className="mt-3 text-muted">For invoice</small>
              <br />
              <span className="text-danger">
                {errors.company_full_address &&
                  errors.company_full_address.message}
              </span>
            </div>
            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="company_vat_or_tax_no"
                name="company_vat_or_tax_no"
                type="text"
                placeholder="Company's VAT/Tax number (for invoice)"
                {...register("company_vat_or_tax_no")}
              />
              <label htmlFor="company_vat_or_tax_no">
                Company&apos;s VAT/Tax number
              </label>
              <small className="mt-3 text-muted">For invoice</small>
              <br />
              <span className="text-danger">
                {errors.company_vat_or_tax_no &&
                  errors.company_vat_or_tax_no.message}
              </span>
            </div>
            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="company_twitter"
                name="company_twitter"
                type="text"
                placeholder="Company's Twitter"
                {...register("company_twitter")}
              />
              <label htmlFor="company_twitter">Company&apos;s Twitter</label>
              <span className="text-danger">
                {errors.company_twitter && errors.company_twitter.message}
              </span>
            </div>
            <div className="form-floating mt-3">
              <input
                className="form-control mt-3 bg-black"
                id="coupon_code"
                name="coupon_code"
                type="text"
                placeholder="Coupon code"
                {...register("coupon_code")}
              />
              <label htmlFor="coupon_code">Coupon code</label>
              <span className="text-danger">
                {errors.coupon_code && errors.coupon_code.message}
              </span>
            </div>
            {/* <div className="mt-4">
              <label>
                Pin your job to the top for: &nbsp;
                {!isAddMode && job.display_pin_duration}
                <br />{" "}
                <small className="mt-3 text-muted">
                  Selected Pin Duration when added this job post
                </small>
              </label>
              <br />
              {isAddMode && (
                <>
                  <Controller
                    name="pin_duration"
                    control={control}
                    render={({ field }) => (
                      <>
                        {formData.jobPinDuration.map((pin, index) => (
                          <div className="ps-2 mb-2" key={index}>
                            <input
                              {...field}
                              className="form-check-input"
                              type="radio"
                              value={pin.value}
                              name="pin_duration"
                              id={`pin_duration[${index}]`}
                              defaultChecked={
                                field.value === pin.value
                                  ? true
                                  : index === 0
                                  ? true
                                  : false
                              }
                              {...register("pin_duration")}
                            />
                            <label htmlFor={`pin_duration[${index}]`}>
                              &nbsp;{pin.label}
                            </label>
                          </div>
                        ))}
                      </>
                    )}
                  />
                  <span className="text-danger">
                    {errors.pin_duration && errors.pin_duration.message}
                  </span>
                </>
              )}
            </div> */}
            {job && job.company_logo !== null && (
              <div className="mt-4">
                <label>Add a logo to your job post</label>
                <br />
                <ImageUploading
                  value={selectedCompanyLogo}
                  onChange={(e) => {
                    setSelectedCompanyLogo(e);
                  }}
                  acceptType={["jpg", "jpeg", "png"]}
                  maxFileSize={1000000}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors,
                  }) => (
                    <div className="upload__image-wrapper">
                      <button
                        style={isDragging ? { color: "red" } : undefined}
                        type="button"
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop here
                      </button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item mt-2">
                          <img src={image["data_url"]} alt="" width="100" />
                          <div className="image-item__btn-wrapper mt-2">
                            <button
                              onClick={() => onImageUpdate(index)}
                              type="button"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => onImageRemove(index)}
                              type="button"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      {errors && (
                        <div>
                          {errors.acceptType && (
                            <span className="text-danger">
                              The company logo must be a file of type:
                              png/jpg/jpeg.
                            </span>
                          )}
                          {errors.maxFileSize && (
                            <span className="text-danger">
                              The company logo must be less than or equal to
                              1000 kilobytes.
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </ImageUploading>
                {job && job.company_logo && selectedCompanyLogo.length <= 0 && (
                  <div className="mt-2">
                    <img src={job.company_logo} alt="" width="100" />
                  </div>
                )}
              </div>
            )}
            {/* <div className="mt-4">
              <label>Highlight your job post with:</label>&nbsp;
              {!isAddMode &&
                job.job_highlight_color_type === "No" &&
                job.job_highlight_color_type}
              {!isAddMode && job.job_highlight_color_type !== "No" && (
                <>
                  {job.job_highlight_color_type}
                  &nbsp;&nbsp;
                  <input type="color" value={job.job_higlight_color} disabled />
                </>
              )}
              {!isAddMode && (
                <>
                  <br />{" "}
                  <small className="mt-3 text-muted">
                    Selected Highlight Color when added this job post
                  </small>
                </>
              )}

              <br />
              {isAddMode && (
                <>
                  <Controller
                    name="job_highlight_color_type"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className="ps-2">
                          <input
                            {...field}
                            className="form-check-input"
                            type="radio"
                            value="No"
                            name="job_highlight_color_type"
                            id="job_highlight_color_type[no]"
                            {...register("job_highlight_color_type")}
                            defaultChecked={field.value === "No" ? true : true}
                            onChange={(e) => {
                              setValue("job_higlight_color", "#000000");
                              setHighlightColorDisable(true);
                            }}
                          />
                          &nbsp;
                          <label htmlFor="job_highlight_color_type[no]">
                            No color
                          </label>
                        </div>
                        <div className="ps-2">
                          <input
                            {...field}
                            className="form-check-input"
                            type="radio"
                            value="Basic"
                            name="job_highlight_color_type"
                            id="job_highlight_color_type[basic]"
                            {...register("job_highlight_color_type")}
                            defaultChecked={field.value === "Basic"}
                            onChange={(e) => {
                              setValue("job_higlight_color", "#534388");
                              setHighlightColorDisable(true);
                            }}
                          />
                          &nbsp;
                          <label htmlFor="job_highlight_color_type[basic]">
                            Basic color
                          </label>
                        </div>
                        <div className="ps-2 d-flex">
                          <input
                            {...field}
                            className="form-check-input"
                            type="radio"
                            value="Custom"
                            name="job_highlight_color_type"
                            id="job_highlight_color_type[custom]"
                            {...register("job_highlight_color_type")}
                            defaultChecked={field.value === "Custom"}
                            onChange={(e) => {
                              setValue("job_higlight_color", "#003399");
                              setHighlightColorDisable(false);
                            }}
                          />
                          &nbsp;
                          <label htmlFor="job_highlight_color_type[custom]">
                            Custom color
                          </label>
                          &nbsp;&nbsp;
                          <input
                            type="color"
                            name="job_higlight_color"
                            id="job_higlight_color"
                            {...register("job_higlight_color")}
                            disabled={highlightColorDisable}
                          />
                        </div>
                      </>
                    )}
                  />
                  <span className="text-danger">
                    {errors.job_highlight_color_type &&
                      errors.job_highlight_color_type.message}
                  </span>
                  <span className="text-danger">
                    {errors.job_higlight_color &&
                      errors.job_higlight_color.message}
                  </span>
                </>
              )}
            </div> */}
            {/* <div className="mt-4">
              <Controller
                name="enable_message_to_discord"
                control={control}
                render={({ field }) => (
                  <div className="d-flex">
                    <label>Message everyone in Discord about your job:</label>
                    {formData.typesYesNo.map((type, index) => (
                      <div className="ps-2 mb-2" key={index}>
                        <input
                          {...field}
                          className="form-check-input"
                          type="radio"
                          value={type}
                          name="enable_message_to_discord"
                          id={`enable_message_to_discord[${index}]`}
                          defaultChecked={
                            field.value === type
                              ? true
                              : index === 0
                              ? true
                              : false
                          }
                          {...register("enable_message_to_discord")}
                        />
                        <label htmlFor={`enable_message_to_discord[${index}]`}>
                          &nbsp;{type}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
              <span className="text-danger">
                {errors.enable_message_to_discord &&
                  errors.enable_message_to_discord.message}
              </span>
            </div> */}
            {/* <div className="mt-3">
              <Controller
                name="enable_email_to_subcribers"
                control={control}
                render={({ field }) => (
                  <div className="d-flex">
                    <label>Email blast your job to our subscribers:</label>
                    {formData.typesYesNo.map((type, index) => (
                      <div className="ps-2 mb-2" key={index}>
                        <input
                          {...field}
                          className="form-check-input"
                          type="radio"
                          value={type}
                          name="enable_email_to_subcribers"
                          id={`enable_email_to_subcribers[${index}]`}
                          defaultChecked={
                            field.value === type
                              ? true
                              : index === 0
                              ? true
                              : false
                          }
                          {...register("enable_email_to_subcribers")}
                        />
                        <label htmlFor={`enable_email_to_subcribers[${index}]`}>
                          &nbsp;{type}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
              <span className="text-danger">
                {errors.enable_email_to_subcribers &&
                  errors.enable_email_to_subcribers.message}
              </span>
            </div> */}
            <button
              type="submit"
              value="Submit"
              className="w-100 mt-3 my-btn-primary-maximum mt-4 submit-button"
            >
              {status === "pending" && (
                <i className="fa fa-spinner fa-spin me-2"></i>
              )}
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
