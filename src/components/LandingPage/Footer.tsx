import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { ContactUsDetails } from "../../constants/enum/ContactUs";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        height: "20rem",
        background: "#232425",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          margin: "6rem 50px",
          display: "flex",
          flexDirection: "column",
          flex: "1",
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
          NFT's Hangouts
        </Typography>
        <Typography variant="body1" sx={{ color: "#ACACAC" }}>
          The best way to rent, lend, and mortgage NFTs.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: "6rem",
          marginRight: "200px",
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
          Navigate
        </Typography>

        <StyledList>
          <Link to={"/rent"} style={{ textDecoration: "none" }}>
            <StyledListItems>Rent</StyledListItems>
          </Link>
          <Link to={"/lend"} style={{ textDecoration: "none" }}>
            <StyledListItems>Lend</StyledListItems>
          </Link>
          <Link to={"/wishlist"} style={{ textDecoration: "none" }}>
            <StyledListItems>Wishlist</StyledListItems>
          </Link>
          <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
            <StyledListItems>Dashboard</StyledListItems>
          </Link>
        </StyledList>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: "6rem",
          marginRight: "50px",
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
          Contact Us
        </Typography>

        <StyledList style={{ lineHeight: "0.4" }}>
          <StyledListItems>+91 {ContactUsDetails.phoneNumber}</StyledListItems>
          <StyledListItems>{ContactUsDetails.email}</StyledListItems>
        </StyledList>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <IconButton>
            <svg
              width="20"
              height="20"
              viewBox="0 0 28 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.7396 1.85805C23.7319 1.8425 23.719 1.83032 23.7033 1.82368C21.8879 0.964724 19.9721 0.352223 18.0039 0.00150237C17.986 -0.00192585 17.9676 0.00054731 17.9511 0.00857012C17.9347 0.0165929 17.9211 0.0297569 17.9123 0.04619C17.6515 0.534458 17.4147 1.03599 17.2028 1.54887C15.0812 1.21675 12.9232 1.21675 10.8016 1.54887C10.5883 1.03469 10.3477 0.533031 10.0808 0.04619C10.0717 0.0301141 10.0581 0.0172532 10.0417 0.00928254C10.0254 0.00131184 10.0071 -0.00139929 9.98922 0.00150237C8.02082 0.351487 6.10493 0.964034 4.28977 1.82373C4.27423 1.83052 4.26112 1.84212 4.25225 1.85692C0.622281 7.4472 -0.372103 12.9 0.115708 18.2853C0.11708 18.2985 0.121013 18.3113 0.127271 18.3229C0.133529 18.3345 0.141985 18.3447 0.152137 18.3528C2.26583 19.9668 4.63003 21.1987 7.14383 21.9961C7.16153 22.0015 7.18044 22.0013 7.198 21.9954C7.21556 21.9894 7.23094 21.9781 7.24207 21.9629C7.78198 21.2053 8.26038 20.4031 8.67241 19.5644C8.67807 19.5529 8.6813 19.5402 8.68189 19.5274C8.68248 19.5145 8.68041 19.5016 8.67583 19.4896C8.67124 19.4776 8.66425 19.4667 8.65529 19.4577C8.64634 19.4487 8.63563 19.4417 8.62388 19.4373C7.86948 19.1396 7.13913 18.7808 6.43968 18.3641C6.42698 18.3564 6.41631 18.3456 6.40861 18.3327C6.40092 18.3197 6.39644 18.305 6.39557 18.2898C6.3947 18.2746 6.39746 18.2595 6.40362 18.2457C6.40978 18.2319 6.41914 18.2198 6.43087 18.2106C6.57805 18.0973 6.72268 17.9804 6.86464 17.8602C6.87709 17.8496 6.89215 17.8428 6.90814 17.8406C6.92412 17.8384 6.94039 17.8408 6.95511 17.8476C11.5375 20.0042 16.4985 20.0042 21.0266 17.8476C21.0413 17.8403 21.0578 17.8376 21.074 17.8396C21.0902 17.8416 21.1056 17.8484 21.1182 17.859C21.2603 17.9799 21.4053 18.0971 21.5531 18.2106C21.5649 18.2197 21.5743 18.2317 21.5806 18.2454C21.5868 18.2592 21.5897 18.2743 21.5889 18.2895C21.5882 18.3047 21.5838 18.3194 21.5762 18.3324C21.5686 18.3455 21.558 18.3563 21.5454 18.3641C20.8475 18.7843 20.1165 19.1429 19.3601 19.4362C19.3484 19.4408 19.3377 19.4479 19.3288 19.457C19.3199 19.4662 19.313 19.4772 19.3085 19.4893C19.304 19.5014 19.302 19.5143 19.3027 19.5273C19.3034 19.5402 19.3067 19.5528 19.3125 19.5644C19.7314 20.3984 20.2091 21.1996 20.7417 21.9615C20.7525 21.9772 20.7678 21.9889 20.7855 21.9951C20.8031 22.0012 20.8222 22.0015 20.84 21.9959C23.3583 21.2013 25.7266 19.9692 27.843 18.3528C27.8533 18.3451 27.8618 18.3352 27.8681 18.3237C27.8744 18.3123 27.8782 18.2996 27.8794 18.2865C28.4634 12.0605 26.9017 6.65235 23.7396 1.85805ZM9.35674 15.0062C7.97712 15.0062 6.84035 13.7006 6.84035 12.0972C6.84035 10.4937 7.95507 9.188 9.35674 9.188C10.7694 9.188 11.8951 10.5051 11.8731 12.0971C11.8731 13.7006 10.7583 15.0062 9.35674 15.0062ZM18.6606 15.0062C17.281 15.0062 16.1442 13.7006 16.1442 12.0972C16.1442 10.4937 17.259 9.188 18.6606 9.188C20.0733 9.188 21.199 10.5051 21.177 12.0971C21.177 13.7006 20.0733 15.0062 18.6606 15.0062Z"
                fill="white"
              />
            </svg>
          </IconButton>
          <IconButton>
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 2.41073C24.0806 2.81811 23.093 3.09337 22.0547 3.21778C23.126 2.57675 23.9275 1.56785 24.3097 0.379325C23.3031 0.977173 22.2016 1.39799 21.0528 1.62349C20.2803 0.798669 19.2571 0.251965 18.142 0.0682555C17.027 -0.115454 15.8825 0.0741102 14.8862 0.607517C13.8899 1.14092 13.0976 1.98833 12.6323 3.01817C12.167 4.04801 12.0547 5.20266 12.3128 6.30287C10.2734 6.20047 8.27824 5.67038 6.45691 4.74701C4.63558 3.82364 3.02876 2.52761 1.74073 0.943053C1.30032 1.70276 1.04708 2.58359 1.04708 3.52167C1.04659 4.36615 1.25455 5.1977 1.65251 5.94254C2.05048 6.68737 2.62614 7.32247 3.32842 7.79146C2.51396 7.76555 1.71747 7.54548 1.00524 7.14956V7.21562C1.00516 8.40005 1.41486 9.54802 2.16483 10.4648C2.91479 11.3815 3.95883 12.0105 5.11979 12.2451C4.36425 12.4496 3.57211 12.4797 2.80322 12.3332C3.13078 13.3523 3.76882 14.2435 4.62804 14.882C5.48725 15.5205 6.52462 15.8743 7.59491 15.8939C5.77803 17.3202 3.53418 18.0939 1.22435 18.0905C0.815182 18.0906 0.406364 18.0667 0 18.0189C2.34462 19.5264 5.07392 20.3265 7.86136 20.3234C17.2972 20.3234 22.4555 12.5083 22.4555 5.73033C22.4555 5.51013 22.45 5.28772 22.4401 5.06751C23.4435 4.34191 24.3096 3.44338 24.9978 2.41403L25 2.41073Z"
                fill="white"
              />
            </svg>
          </IconButton>
          <IconButton>
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.34659 0.075C8.67955 0.0136363 9.10455 0 12.5 0C15.8955 0 16.3205 0.0147727 17.6523 0.075C18.9841 0.135227 19.8932 0.347727 20.6886 0.655682C21.5216 0.970455 22.2773 1.4625 22.9023 2.09886C23.5386 2.72273 24.0295 3.47727 24.3432 4.31136C24.6523 5.10682 24.8636 6.01591 24.925 7.34545C24.9864 8.68068 25 9.10568 25 12.5C25 15.8955 24.9852 16.3205 24.925 17.6534C24.8648 18.983 24.6523 19.892 24.3432 20.6875C24.0295 21.5217 23.5378 22.2775 22.9023 22.9023C22.2773 23.5386 21.5216 24.0295 20.6886 24.3432C19.8932 24.6523 18.9841 24.8636 17.6545 24.925C16.3205 24.9864 15.8955 25 12.5 25C9.10455 25 8.67955 24.9852 7.34659 24.925C6.01705 24.8648 5.10795 24.6523 4.3125 24.3432C3.47832 24.0295 2.72252 23.5378 2.09773 22.9023C1.4618 22.278 0.969676 21.5226 0.655682 20.6886C0.347727 19.8932 0.136364 18.9841 0.075 17.6545C0.0136363 16.3193 0 15.8943 0 12.5C0 9.10455 0.0147727 8.67955 0.075 7.34773C0.135227 6.01591 0.347727 5.10682 0.655682 4.31136C0.97014 3.47737 1.46263 2.72195 2.09886 2.09773C2.72277 1.46193 3.47781 0.969822 4.31136 0.655682C5.10682 0.347727 6.01591 0.136364 7.34545 0.075H7.34659ZM17.5511 2.325C16.233 2.26477 15.8375 2.25227 12.5 2.25227C9.1625 2.25227 8.76705 2.26477 7.44886 2.325C6.22955 2.38068 5.56818 2.58409 5.12727 2.75568C4.54432 2.98295 4.12727 3.25227 3.68977 3.68977C3.27505 4.09324 2.95589 4.58441 2.75568 5.12727C2.58409 5.56818 2.38068 6.22955 2.325 7.44886C2.26477 8.76705 2.25227 9.1625 2.25227 12.5C2.25227 15.8375 2.26477 16.233 2.325 17.5511C2.38068 18.7705 2.58409 19.4318 2.75568 19.8727C2.95568 20.4148 3.275 20.9068 3.68977 21.3102C4.09318 21.725 4.58523 22.0443 5.12727 22.2443C5.56818 22.4159 6.22955 22.6193 7.44886 22.675C8.76705 22.7352 9.16136 22.7477 12.5 22.7477C15.8386 22.7477 16.233 22.7352 17.5511 22.675C18.7705 22.6193 19.4318 22.4159 19.8727 22.2443C20.4557 22.017 20.8727 21.7477 21.3102 21.3102C21.725 20.9068 22.0443 20.4148 22.2443 19.8727C22.4159 19.4318 22.6193 18.7705 22.675 17.5511C22.7352 16.233 22.7477 15.8375 22.7477 12.5C22.7477 9.1625 22.7352 8.76705 22.675 7.44886C22.6193 6.22955 22.4159 5.56818 22.2443 5.12727C22.017 4.54432 21.7477 4.12727 21.3102 3.68977C20.9067 3.27508 20.4156 2.95592 19.8727 2.75568C19.4318 2.58409 18.7705 2.38068 17.5511 2.325ZM10.9034 16.3534C11.7951 16.7246 12.7879 16.7747 13.7124 16.4951C14.6369 16.2156 15.4357 15.6238 15.9723 14.8207C16.5089 14.0177 16.7501 13.0533 16.6546 12.0922C16.5591 11.1311 16.133 10.2329 15.4489 9.55114C15.0128 9.11531 14.4855 8.7816 13.9049 8.57403C13.3244 8.36646 12.705 8.29018 12.0915 8.3507C11.4779 8.41122 10.8854 8.60702 10.3566 8.92401C9.82779 9.241 9.37584 9.6713 9.0333 10.1839C8.69075 10.6965 8.46612 11.2787 8.37559 11.8886C8.28505 12.4984 8.33085 13.1208 8.5097 13.7108C8.68855 14.3008 8.996 14.8439 9.40991 15.3008C9.82382 15.7578 10.3339 16.1173 10.9034 16.3534ZM7.95682 7.95682C8.55344 7.3602 9.26173 6.88694 10.0412 6.56405C10.8208 6.24116 11.6563 6.07497 12.5 6.07497C13.3437 6.07497 14.1792 6.24116 14.9588 6.56405C15.7383 6.88693 16.4466 7.3602 17.0432 7.95682C17.6398 8.55344 18.1131 9.26173 18.436 10.0412C18.7588 10.8208 18.925 11.6563 18.925 12.5C18.925 13.3437 18.7588 14.1792 18.436 14.9588C18.1131 15.7383 17.6398 16.4466 17.0432 17.0432C15.8383 18.2481 14.204 18.925 12.5 18.925C10.796 18.925 9.16175 18.2481 7.95682 17.0432C6.75189 15.8383 6.07497 14.204 6.07497 12.5C6.07497 10.796 6.75189 9.16175 7.95682 7.95682ZM20.35 7.03182C20.4978 6.89235 20.6162 6.72464 20.6981 6.53861C20.7799 6.35258 20.8236 6.15201 20.8266 5.94878C20.8296 5.74556 20.7917 5.5438 20.7153 5.35547C20.6389 5.16713 20.5255 4.99603 20.3818 4.85232C20.2381 4.7086 20.067 4.59518 19.8786 4.51877C19.6903 4.44236 19.4885 4.40452 19.2853 4.40748C19.0821 4.41044 18.8815 4.45415 18.6955 4.53602C18.5095 4.61789 18.3417 4.73624 18.2023 4.88409C17.931 5.17162 17.7825 5.55355 17.7883 5.94878C17.7941 6.34402 17.9536 6.72145 18.2331 7.00096C18.5126 7.28046 18.8901 7.44003 19.2853 7.44579C19.6805 7.45156 20.0625 7.30306 20.35 7.03182Z"
                fill="white"
              />
            </svg>
          </IconButton>
          <IconButton>
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.28625 8.71125H13.9287V11.0238C14.5975 9.69375 16.3125 8.49875 18.8888 8.49875C23.8275 8.49875 25 11.1463 25 16.0038V25H20V17.11C20 14.3437 19.3313 12.7838 17.6288 12.7838C15.2675 12.7838 14.2862 14.465 14.2862 17.1088V25H9.28625V8.71125V8.71125ZM0.7125 24.7875H5.7125V8.49875H0.7125V24.7875V24.7875ZM6.42875 3.1875C6.42894 3.60659 6.34582 4.02154 6.18423 4.40823C6.02265 4.79492 5.78581 5.14564 5.4875 5.44C4.883 6.04078 4.06476 6.37707 3.2125 6.375C2.36174 6.37443 1.54539 6.039 0.94 5.44125C0.642764 5.14589 0.406732 4.79478 0.24543 4.40804C0.0841268 4.0213 0.000723915 3.60653 0 3.1875C0 2.34125 0.3375 1.53125 0.94125 0.93375C1.54611 0.335198 2.3628 -0.000374013 3.21375 3.12831e-07C4.06625 3.12831e-07 4.88375 0.33625 5.4875 0.93375C6.09 1.53125 6.42875 2.34125 6.42875 3.1875Z"
                fill="white"
              />
            </svg>
          </IconButton>
          <IconButton>
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.39063 0H23.625C24.3906 0 25 0.609375 25 1.375V23.625C25 24.375 24.3906 25 23.625 25H17.25V15.3125H20.5L20.9844 11.5469H17.25V9.14062C17.25 8.04688 17.5625 7.29688 19.125 7.29688H21.125V3.92188C20.7812 3.875 19.5938 3.78125 18.2188 3.78125C15.3281 3.78125 13.3594 5.53125 13.3594 8.76562V11.5469H10.0938V15.3125H13.3594V25H1.39063C1.0245 25 0.673136 24.8557 0.412788 24.5982C0.15244 24.3408 0.00411377 23.9911 0 23.625V1.375C0 0.609375 0.625 0 1.39063 0Z"
                fill="white"
              />
            </svg>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const StyledList = styled(List)(({ theme }) => ({
  marginLeft: "-12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  color: "white",
  fontWeight: "1rem",
  fontSize: "0.9rem",
}));

const StyledListItems = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
  color: "#ACACAC",
  transition: "all 0.5s ease",
  "&:hover": {
    underline: "1px solid #D9136B",
    color: "#D9136B",
  },
}));
export default Footer;
