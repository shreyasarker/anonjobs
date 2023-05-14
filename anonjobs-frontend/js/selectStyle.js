const selectStyle = {
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: "#d5d3d3",
  }),
  input: (base, state) => ({
    ...base,
    color: 'white'
  }),
  menu: (base) => ({
    ...base,
    background: "#000000",
    border: `1px solid #9479fc`,
  }),
  control: (base, state) => ({
    ...base,
    height: "100%",
    background: "#000000",
    color: "#d5d3d3",
    borderColor: state.isFocused ? "#9479fc" : "white",
    boxShadow: state.isFocused ? "0 0 0 0.25rem rgb(135 127 142 / 21%)" : null,
    "&:hover": {
      borderColor: state.isFocused ? "#9479fc" : "white",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? "#9479fc" : "#000000",
    color: isFocused ? "#d5d3d3" : "#d5d3d3",
    ":active": {
      ...styles[":active"],
      backgroundColor: !isDisabled
        ? isSelected
          ? data.color
          : "#9479fc"
        : null,
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#d5d3d3",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#9479fc",
    border: `1px solid #9479fc`,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#0d0208",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#0d0208",
    ":hover": {
      backgroundColor: "#0d0208",
      color: "#9479fc",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 2,
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 2,
  }),
};

export default selectStyle;
