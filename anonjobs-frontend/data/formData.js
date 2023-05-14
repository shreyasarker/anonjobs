const formData = {
  jobFormFields: ['company', 'company_slug', 'position', 'type', 'is_anon', 'is_remote', 'location',
  'description', 'how_to_apply', 'apply_url_or_email', 'min_yearly_salary', 
  'max_yearly_salary', 'is_crypto_salary', 'crypto_salary_type', 'company_full_name', 
  'company_full_address', 'company_vat_or_tax_no', 'company_twitter', 'coupon_code', 
  'pin_duration', 'is_pinned', 'pinned_deadline', 'company_logo', 
  'job_highlight_color_type', 'job_higlight_color', 'enable_message_to_discord', 
  'enable_email_to_subcribers'],
  ckeditor: [
    "bold",
    "italic",
    "link",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "blockQuote",
    "|",
    "undo",
    "redo",
  ],
  jobTypes: [
    {
      value: "Full-time",
      label: "Full-time",
    },
    {
      value: "Part-time",
      label: "Part-time",
    },
    {
      value: "Contract",
      label: "Contract",
    },
    {
      value: "Temporary",
      label: "Temporary",
    },
    {
      value: "Internship",
      label: "Internship",
    },
    {
      value: "Volunteer",
      label: "Volunteer",
    },
  ],
  typesYesNo: ["Yes", "No"],
  jobCryptoSalaryTypes: [
    {
      value: "BTC",
      label: "BTC",
    },
    {
      value: "ETH",
      label: "ETH",
    },
    {
      value: "SOL",
      label: "SOL",
    },
    {
      value: "BNB",
      label: "BNB",
    },
    {
      value: "USDC",
      label: "USDC",
    },
    {
      value: "USDT",
      label: "USDT",
    },
    {
      value: "LUNA",
      label: "LUNA",
    },
    {
      value: "AVAX",
      label: "AVAX",
    },
    {
      value: "DOT",
      label: "DOT",
    },
    {
      value: "MATIC",
      label: "MATIC",
    },
    {
      value: "NEAR",
      label: "NEAR",
    },
    {
      value: "ATOM",
      label: "ATOM",
    },
    {
      value: "LTC",
      label: "LTC",
    },
    {
      value: "BUSD",
      label: "BUSD",
    },
    {
      value: "UST",
      label: "UST",
    },
    {
      value: "USDH",
      label: "USDH",
    },
    {
      value: "Other",
      label: "Other",
    },
  ],
  jobPinDuration: [
    {
      value: 0,
      label: "No pin"
    },
    {
      value: 1,
      label: "24 hours"
    },
    {
      value: 7,
      label: "7 days"
    },
    {
      value: 14,
      label: "14 days"
    },
    {
      value: 30,
      label: "30 days"
    }
  ],
  jobHighlightColor: [
    {
      value: "No",
      label: "No color",
      color: "",
      colorEnabled: false,
    },
    {
      value: "Basic",
      label: "Basic color",
      color: "",
      colorEnabled: false,
    },
    {
      value: "Custom",
      label: "Custom color",
      color: "",
      colorEnabled: true,
    },
  ],
};

export default formData;
