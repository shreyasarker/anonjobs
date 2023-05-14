const Subscription = () => {
  return (
    <div
    className="d-none d-md-block fixed-bottom bg-black alert alert-dismissible fade show border-top email-subscription"
    role="alert"
    id="subscribeAlert"
  >
    <form
      className="text-center d-lg-flex justify-content-center align-items-center"
      action=""
      method="post"
    >
      <div className="d-md-flex align-items-center">
        <div className="d-flex mb-2 mb-md-0">
          <div className="">
            <b>Get new jobs alert sent to</b>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center ms-2">
          <div className="me-2">
            <input
              required="required"
              className="form-control"
              placeholder="Type your email"
              type="email"
              name="subscriber[email]"
              id="subscriber_email"
            />
            <input
              value="remote"
              type="hidden"
              name="subscriber[tags]"
              id="subscriber_tags"
            />
            <input
              type="hidden"
              name="subscriber[location]"
              id="subscriber_location"
            />
          </div>
          <div className="">
            <input
              type="submit"
              name="commit"
              value="Subscribe"
              className="my-btn my-btn-primary-maximum"
              data-disable-with="Subscribe"
            />
          </div>
        </div>
        <div className="align-self-start ms-md-5">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default Subscription
