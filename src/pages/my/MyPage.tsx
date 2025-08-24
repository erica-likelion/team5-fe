import { useNavigate } from "react-router-dom";
import {
  Container,
  ProfileSection,
  ProfileImage,
  ProfileInfo,
  UserName,
  UserDesc,
  RightArrowIcon,
  CoinSection,
  CoinIcon,
  CoinValue,
  CardSection,
  Card,
  CardIcon,
  CardLabel,
  CardValue,
  Divider,
  MenuList,
  MenuItem,
} from "./MyPage.styled";
import rightArrow from "@assets/common/rightArrow.svg";
import profileImg from "@assets/common/profile-pic.svg";
import coin from "@assets/My/coin.svg";
import barcode from "@assets/My/barcode.svg";
import pocket from "@assets/My/pocket.svg";

export const MyPage = () => {
  const navigate = useNavigate();

  // 더미데이터
  const user = {
    name: "하은",
    desc: "한양대학교 ERICA 디자인대학",
    coin: 3500,
    coupons: 5,
    history: 38,
  };

  // 메뉴 항목
  const menuItems = [
    "상품교환",
    "알림설정",
    "환경설정",
    "로그아웃",
    "회원탈퇴",
  ];

  return (
    <Container>
      <ProfileSection onClick={() => navigate("/Ranking")}>
        <ProfileImage src={profileImg} alt="Profile" />
        <ProfileInfo>
          <UserName>{user.name}</UserName>
          <UserDesc>{user.desc}</UserDesc>
        </ProfileInfo>
        <RightArrowIcon src={rightArrow} alt="right arrow" />
      </ProfileSection>
      <CoinSection>
        <CoinIcon src={coin} alt="Coin" />
        <CoinValue>{user.coin.toLocaleString()}</CoinValue>
      </CoinSection>
      <CardSection>
        <Card>
          <CardIcon src={barcode} alt="쿠폰" />
          <CardLabel>사용 가능 쿠폰</CardLabel>
          <CardValue>{user.coupons}개</CardValue>
        </Card>
        <Divider />
        <Card onClick={() => navigate("/History")}>
          <CardIcon src={pocket} alt="적립내역" />
          <CardLabel>적립내역</CardLabel>
          <CardValue>{user.history}건</CardValue>
        </Card>
      </CardSection>
      <MenuList>
        {menuItems.map((item, idx) => (
          <MenuItem key={item}>{item}</MenuItem>
        ))}
      </MenuList>
    </Container>
  );
};

export default MyPage;
