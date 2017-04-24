import React from 'react';


const inputStyle = {
  width: 65 + "%",
  fontSize: 40 + "px",
  margin: 30 + "px",
  border: "1px solid black",
  borderRadius: 5 + "px",
};

export default ({inputValue, values, response, addValue, onInputChange}) => {


  const handleSubmit = e => {
    e.preventDefault();
    addValue(inputValue, values, response.id)
  }

  const handleChange = (e) => {
    onInputChange(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        style={inputStyle}
      />
    </form>
  )
}