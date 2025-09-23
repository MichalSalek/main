import {SvgIconOwnProps} from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CropRoundedIcon from '@mui/icons-material/CropRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountOutlinedCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import CollectionsIcon from '@mui/icons-material/Collections';
import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone';
import DevicesTwoToneIcon from '@mui/icons-material/DevicesTwoTone';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';


export const getAppIcon = Object.freeze({

  Back: (props?: SvgIconOwnProps) => <ArrowBackIosNewRoundedIcon {...props}/>,
  Up: (props?: SvgIconOwnProps) => <KeyboardDoubleArrowUpIcon {...props}/>,
  Accept: (props?: SvgIconOwnProps) => <DoneRoundedIcon {...props}/>,
  Expand: (props?: SvgIconOwnProps) => <ArrowDownwardIcon {...props}/>,
  Go: (props?: SvgIconOwnProps) => <ArrowRightSharpIcon {...props}/>,

  AddPhoto: (props?: SvgIconOwnProps) => <AddPhotoAlternateOutlinedIcon {...props}/>,
  Photos: (props?: SvgIconOwnProps) => <CollectionsIcon {...props}/>,
  Crop: (props?: SvgIconOwnProps) => <CropRoundedIcon {...props}/>,
  Upload: (props?: SvgIconOwnProps) => <CloudUploadOutlinedIcon {...props}/>,

  Logout: (props?: SvgIconOwnProps) => <LogoutIcon {...props}/>,
  Notification: (props?: SvgIconOwnProps) => <NotificationsIcon {...props}/>,
  Loading: (props?: SvgIconOwnProps) => <HourglassTopRoundedIcon {...props}/>,

  Account: (props?: SvgIconOwnProps & {variant?: 'contained'}) => props?.variant === 'contained' ? <AccountCircle {...props} /> : <AccountOutlinedCircleIcon {...props}/>,
  PricingPlan: (props?: SvgIconOwnProps) => <ShoppingCartCheckoutTwoToneIcon {...props}/>,
  Home: (props?: SvgIconOwnProps) => <HomeOutlinedIcon {...props}/>,
  Admin: (props?: SvgIconOwnProps) => <AdminPanelSettingsTwoToneIcon {...props}/>,
  Refresh: (props?: SvgIconOwnProps) => <RefreshSharpIcon {...props}/>,
  HistoryBack: (props?: SvgIconOwnProps) => <ReplyAllRoundedIcon {...props}/>,

  Contact: (props?: SvgIconOwnProps) => <QuestionAnswerOutlinedIcon {...props}/>,
  Features: (props?: SvgIconOwnProps) => <RocketLaunchTwoToneIcon {...props}/>,
  Heart: (props?: SvgIconOwnProps) => <FavoriteTwoToneIcon {...props}/>,

  Devices: (props?: SvgIconOwnProps) => <DevicesTwoToneIcon {...props}/>,

  HamburgerClosed: (props?: SvgIconOwnProps) => <MenuRoundedIcon {...props}/>,
  HamburgerOpen: (props?: SvgIconOwnProps) => <MenuOpenRoundedIcon {...props}/>,

  AddNew: (props?: SvgIconOwnProps) => <AddBoxOutlinedIcon {...props}/>,

  CheckboxChecked: (props?: SvgIconOwnProps) => <CheckBoxIcon {...props}/>,
  CheckboxUnchecked: (props?: SvgIconOwnProps) => <CheckBoxOutlineBlankIcon {...props}/>,

  Success: (props?: SvgIconOwnProps) => <CheckCircleIcon {...props} color={'success'}/>,
  Warning: (props?: SvgIconOwnProps) => <WarningIcon {...props} color={'warning'}/>,
  Error: (props?: SvgIconOwnProps) => <ReportIcon {...props} color={'error'}/>,
  Info: (props?: SvgIconOwnProps) => <InfoOutlineIcon {...props} color={'info'}/>,

  Filter: (props?: SvgIconOwnProps) => <FilterAltTwoToneIcon {...props} color={'info'}/>,


} as const)
