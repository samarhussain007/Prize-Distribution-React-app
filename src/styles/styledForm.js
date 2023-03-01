import React from "react";
import { styled } from "@mui/material";
const StyledForm = styled("div")(
  () => `
    gap: 40px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 20px;
    background-color: #f5f5f5;
    color: #000;
  
    .cta-section{
      width: 40%;
    }
  
    .navbar{
      text-align: center;
    }
  
    .form{
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-align: start;
      padding: 20px;
    }
  
    .graph-representation{
      height: 400px;
      width: 60%;
    }
    .response-container{
      display: flex;
      gap: 20px;
      width: 1000px; 
    }
  
    input{
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #666;
    }
    .input-container{
      display: flex;
      gap: 20px;
    }
  
    label{
      font-size: 20px;
      font-weight: 600;
    }
  
    Button{
      background-color: #ff8100;
      color: #000;
      width: 200px;
    }
  
    .main-wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
  
  `
);

export default StyledForm;
