import * as yup from "yup"

export const userSchema = yup.object().shape({
    name: yup.string().required(),
    dob: yup.string().required(),
    sex: yup.string().min(1,"Required").required(),
    id_type: yup.string(),
    govt_num: yup.string().when('id_type', {
        is: (idType) => idType && idType === 'Aadhar',
        then: yup.string().matches(/^\d{12}$/, 'Invalid Aadhar number'),
        otherwise: yup.string().when('id_type', {
            is: 'PAN',
            then: yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number'),
            otherwise: yup.string().notRequired()
          })
        // otherwise: yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
      }),
    mobile: yup.string().matches(/^[6-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: true}),
    e_con_num: yup.string().matches(/^[6-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: true}),
    
})