import { useForm } from "react-hook-form";
import "./RegistrationForm.css";

import {yupResolver} from "@hookform/resolvers/yup";
import { userSchema } from "../Validations/userValidation";
import { useNavigate } from "react-router-dom";
export function RegistrationForm() {

  const navigate = useNavigate();
  const handleNavigate = (e) => {
  navigate("/table");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({resolver: yupResolver(userSchema)});

  const onSubmit = async (data) => {
    try {
      const body = data;
      const isValid = await userSchema.isValid(data);
  
      if(isValid)
      {
        const response = await fetch("http://localhost:5001/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      
      if(response.status === 201){
        
        window.alert("Data Inserted Successfully");
        
        reset();
      }
      else
        window.alert("Something went wrong.Please try again later");
    }
    }
    catch(err) {
      console.log(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <b>
          <u>Personal Details</u>
        </b>
      </div>
      <table width="100%" cellPadding={"10px"} cellSpacing={"10px"}>
        <tr>
          <td width="5%">
            <label htmlFor="name">Name</label>
            <sup style={{ color: "red" }}>*</sup>
          </td>
          <td width="25%">
            <input
              id="name"
              {...register("name")}
              placeholder="Enter Name"
              style={{ marginLeft: "5%", width: "85%" }}
            />
            <br />{!!errors.name && (
              <span className="error" style={{color:'red'}}>This field is required</span>
            )}
          </td>
          <td width="8%">
            <label htmlFor="dob">Date of Birth or Age</label>
            <sup style={{ color: "red" }}>*</sup>
          </td>
          <td width="25%">
            <input
              id="dob"
              {...register("dob")}
              placeholder="DD/MM/YYYY or Age in Years"
              style={{ marginLeft: "4%", width: "70%" }}
            />
           <br /> {!!errors.dob && (
              <span className="error" style={{color:'red'}}>This field is required</span>
            )}
          </td>
          <td width="5%">
            <label htmlFor="sex">Sex</label>
            <sup style={{ color: "red" }}>*</sup>
          </td>
          <td width="25%">
            <select
              id="sex"
              {...register("sex")}
              style={{ marginLeft: "5%", width: "50%" }}
            >
              <option value="">-- Enter Sex --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <br/>{!!errors.sex && (
              <span className="error" style={{color:'red'}}>This field is required</span>
            )}
          </td>
        </tr>
        <tr>
          <td width="5%">
            <label htmlFor="mobile">Mobile</label>
          </td>
          <td width="25%">
            <input
              id="mobile"
              {...register("mobile")}
              placeholder="Enter Mobile"
              style={{ marginLeft: "5%", width: "70%" }}
            />
            <br/>{!!errors.mobile && (
              <span className="error" style={{color:'red'}}>Mobile Number should be valid indian mobile number</span>
            )}
          </td>
          <td width="7%">
            <label htmlFor="govt_num">Govt Issued ID</label>
          </td>
          <td colspan="3" width="70%">
            <select
              id="id_type"
              {...register("id_type")}
              style={{ marginLeft: "2%", width: "25%" }}
            >
              <option value="">-- ID Type --</option>
              <option value="Aadhar">Aadhar</option>
              <option value="PAN">PAN</option>
            </select>

            <input
              id="govt_num"
              {...register("govt_num")}
              placeholder="Enter Govt ID"
              style={{ marginLeft: "5%", width: "60%" }}
            />
             <br/>{!!errors.govt_num && (
              <span className="error" style={{color:'red'}}>It should be valid id number</span>
            )}
          </td>
        </tr>
      </table>
      <b>
        <u>Contact Details</u>
      </b>
      <table width="100%" cellPadding={"10px"} cellSpacing={"10px"}>
        <tr>
          <td width="5%">
            <label htmlFor="g_name">Guardian Details</label>
          </td>
          <td width="9%">
            <select
              id="g_title"
              {...register("g_title")}
              style={{ width: "100%" }}
            >
              <option value="">-- Enter Label --</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
          </td>
          <td width="16%">
            <input
              id="g_name"
              {...register("g_name")}
              placeholder="Enter Guardian Name"
              style={{ width: "83%" }}
            />
          </td>
          <td width="7%">
            <label htmlFor="email">Email</label>
          </td>
          <td width="25%">
            <input
              id="email"
              {...register("email")}
              placeholder="Enter Email"
              style={{ marginLeft: "4%", width: "70%" }}
            />
          </td>
          <td width="7%">
            <label htmlFor="e_con_num">Emergency Contact Number</label>
          </td>
          <td width="25%">
            <input
              id="e_con_num"
              {...register("e_con_num")}
              placeholder="Enter Emergency No"
              style={{ marginLeft: "4%", width: "70%" }}
            />
                        <br/>{!!errors.e_con_num && (
              <span className="error" style={{color:'red'}}>Emergency contact number should be valid indian mobile number</span>
            )}
          </td>
        </tr>
      </table>

      <b>
        <u>Address Details</u>
      </b>
      <table width="100%" cellPadding={"10px"} cellSpacing={"10px"}>
        <tr>
          <td width="5%">
            <label htmlFor="address">Address</label>
          </td>
          <td width="25%">
            <input
              id="address"
              {...register("address")}
              placeholder="Enter Address"
              style={{ marginLeft: "5%", width: "85%" }}
            />
          </td>
          <td width="5%">
            <label htmlFor="state">State</label>
          </td>
          <td width="25%">
            <select
              id="state"
              {...register("state")}
              style={{ marginLeft: "5%", width: "50%" }}
            >
              <option value="">-- Enter State --</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </td>
          <td width="5%">
            <label htmlFor="city">City</label>
          </td>
          <td width="25%">
            <input
              id="city"
              {...register("city")}
              placeholder="Enter City/State/Village"
              style={{ marginLeft: "5%", width: "70%" }}
            />
          </td>
        </tr>
        <tr>
          <td width="5%">
            <label htmlFor="country">Country</label>
          </td>
          <td width="25%">
            <select
              id="country"
              {...register("country", { required: false })}
              style={{ marginLeft: "5%", width: "70%" }}
            >
              <option value="">-- Enter Country --</option>
              <option value="India" selected>India</option>
              <option value="Other">Other</option>
            </select>
          </td>
          <td width="5%">
            <label htmlFor="pincode">PinCode</label>
          </td>
          <td colspan="3" width="70%">
            <input
              id="pincode"
              {...register("pincode")}
              placeholder="Enter PinCode"
              style={{ marginLeft: "2%", width: "30%" }}
            />
          </td>
        </tr>
      </table>

      <b>
        <u>Other Details</u>
      </b>

      <table width="100%" cellPadding={"10px"} cellSpacing={"10px"}>
        <tr>
          <td width="5%">
            <label htmlFor="occupation">Occupation</label>
          </td>
          <td width="20%">
            <input
              id="occupation"
              {...register("occupation")}
              placeholder="Enter Occupation"
              style={{ marginLeft: "5%", width: "75%" }}
            />
          </td>
          <td width="5%">
            <label htmlFor="religion">Religion</label>
          </td>
          <td width="15%">
            <select
              id="religion"
              {...register("religion")}
              style={{ marginLeft: "5%", width: "80%" }}
            >
              <option value="">-- Enter Religion --</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Judaism">Judaism</option>
            </select>
          </td>
          <td width="5%">
            <label htmlFor="m_status">Marital Status</label>
          </td>
          <td width="20%">
            <select
              id="m_status"
              {...register("m_status")}
              style={{ marginLeft: "5%", width: "80%" }}
            >
              <option value="">-- Enter Marital Status --</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
            </select>
          </td>
          <td width="5%">
            <label htmlFor="b_group">Blood Group</label>
          </td>
          <td width="20%">
            <select
              id="b_group"
              {...register("b_group")}
              style={{ marginLeft: "5%", width: "50%" }}
            >
              <option value="">-- Group --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </td>
        </tr>
        <tr>
          <td width="5%">
            <label htmlFor="nationality">Nationality</label>
          </td>
          <td width="25%">
            <select
              id="nationality"
              {...register("nationality")}
              style={{ marginLeft: "5%", width: "70%" }}
            >
              <option value="">-- Enter Nationality --</option>
              <option value="India" selected>India</option>
              <option value="Other">Other</option>
            </select>
          </td>
        </tr>
      </table>

      <div align="right">
      <p style={{width:"120px", height:"50px",borderColor:'black',marginRight:'92%',color:'blue'}} onClick={()=> {handleNavigate()}}><u>Go to DataTable</u></p>
      <button style={{width:"80px", height:"50px",borderColor:'red', color:'red',marginRight:'2%'}} type="reset">Cancel</button>
      <button style={{width:"80px", height:"50px",borderColor:'black', color:'white',backgroundColor:'green', marginRight:'2%'}} type="submit">Submit</button>
      </div>
    </form>
  );
}
