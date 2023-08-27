import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import header from "../../assets/header.jpg"
import profilePic from "../../assets/1693169905795profile.jpg"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Profile = () => {

  const {currentUser} = useContext(AuthContext)

  const userId = parseInt(useLocation().pathname.split("/")[2])

  const {isLoading, error, data} = useQuery(['user'], () =>
  makeRequest.get("/users/find/" +userId).then((res)=>{
    return res.data
  })
  )

  const { isLoading:relationshipIsLoading, data:relationshipData} = useQuery(['relationships'], () =>
  makeRequest.get("/relationships?followedUserId" +userId).then((res)=>{
    return res.data
  })
  )

  const queryClient = useQueryClient()
  const mutation = useMutation(
    (following) =>{
      if(following) return makeRequest.delete("/relationships?userId=" + userId)
      return makeRequest.post("/relationships", {userId})
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"])
      }
    }
  )

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id))
  }


  return (
    <div className="profile">
      {isLoading ? "loading":<><div className="images">
        <img
          src={header}
          alt=""
          className="cover"
          style={{objectFit:"contain"}}
        />
        <img
          src={profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Waukesha, WI</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>Ryan-Batchelor.com</span>
              </div>
            </div>
            {relationshipIsLoading ? "loading":userId === currentUser.id ? (<button>update</button>):
            (<button onClick = {handleFollow}>{relationshipData.includes(currentUser.id) ? "following" : "follow"}</button>)}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts/>
      </div></>}
    </div>
  );
};

export default Profile;
