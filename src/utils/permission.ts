type PermissionStatus = boolean | Promise<boolean>

export enum PermissionType {
  Location = 'location',
  Camera = 'camera',
  PhotoLibrary = 'photoLibrary',
  Record = 'record',
  Push = 'push',
  Contact = 'contact',
  Calendar = 'calendar',
  Memo = 'memo',
}

// 判断平台是否为 iOS
const isIos = (() => {
  // #ifdef APP-PLUS
  return plus.os.name === 'iOS'
  // #endif
})()

// 判断权限是否开启 (iOS)
export const judgeIosPermission = (permissionID: PermissionType): PermissionStatus => {
  switch (permissionID) {
    case PermissionType.Location:
      return judgeIosPermissionLocation()
    case PermissionType.Camera:
      return judgeIosPermissionCamera()
    case PermissionType.PhotoLibrary:
      return judgeIosPermissionPhotoLibrary()
    case PermissionType.Record:
      return judgeIosPermissionRecord()
    case PermissionType.Push:
      return judgeIosPermissionPush()
    case PermissionType.Contact:
      return judgeIosPermissionContact()
    case PermissionType.Calendar:
      return judgeIosPermissionCalendar()
    case PermissionType.Memo:
      return judgeIosPermissionMemo()
    default:
      return false
  }
}

// 判断推送权限是否开启
function judgeIosPermissionPush(): boolean {
  let result = false
  const UIApplication = plus.ios.import('UIApplication')
  const app = UIApplication.sharedApplication()
  let enabledTypes = 0

  if (app.currentUserNotificationSettings) {
    const settings = app.currentUserNotificationSettings()
    enabledTypes = settings.plusGetAttribute('types')
    result = enabledTypes !== 0
    plus.ios.deleteObject(settings)
  } else {
    enabledTypes = app.enabledRemoteNotificationTypes()
    result = enabledTypes !== 0
  }

  plus.ios.deleteObject(app)
  plus.ios.deleteObject(UIApplication)

  return result
}

// 判断定位权限是否开启
function judgeIosPermissionLocation(): boolean {
  const cllocationManger = plus.ios.import('CLLocationManager')
  const status = cllocationManger.authorizationStatus()
  plus.ios.deleteObject(cllocationManger)
  return status !== 2 // 2 代表未开启
}

// 判断麦克风权限是否开启
function judgeIosPermissionRecord(): boolean {
  const avaudiosession = plus.ios.import('AVAudioSession')
  const avaudio = avaudiosession.sharedInstance()
  const permissionStatus = avaudio.recordPermission()
  plus.ios.deleteObject(avaudiosession)

  return permissionStatus !== 1684369017 && permissionStatus !== 1970168948 // 未开启状态
}

// 判断相机权限是否开启
function judgeIosPermissionCamera(): boolean {
  const AVCaptureDevice = plus.ios.import('AVCaptureDevice')
  const authStatus = AVCaptureDevice.authorizationStatusForMediaType('vide')
  plus.ios.deleteObject(AVCaptureDevice)

  return authStatus === 3 // 3 代表已授权
}

// 判断相册权限是否开启
function judgeIosPermissionPhotoLibrary(): boolean {
  const PHPhotoLibrary = plus.ios.import('PHPhotoLibrary')
  const authStatus = PHPhotoLibrary.authorizationStatus()
  plus.ios.deleteObject(PHPhotoLibrary)

  return authStatus === 3 // 3 代表已授权
}

// 判断通讯录权限是否开启
function judgeIosPermissionContact(): boolean {
  const CNContactStore = plus.ios.import('CNContactStore')
  const cnAuthStatus = CNContactStore.authorizationStatusForEntityType(0)
  plus.ios.deleteObject(CNContactStore)

  return cnAuthStatus === 3 // 3 代表已授权
}

// 判断日历权限是否开启
function judgeIosPermissionCalendar(): boolean {
  const EKEventStore = plus.ios.import('EKEventStore')
  const ekAuthStatus = EKEventStore.authorizationStatusForEntityType(0)
  plus.ios.deleteObject(EKEventStore)

  return ekAuthStatus === 3 // 3 代表已授权
}

// 判断备忘录权限是否开启
function judgeIosPermissionMemo(): boolean {
  const EKEventStore = plus.ios.import('EKEventStore')
  const ekAuthStatus = EKEventStore.authorizationStatusForEntityType(1)
  plus.ios.deleteObject(EKEventStore)

  return ekAuthStatus === 3 // 3 代表已授权
}

// Android 权限查询
function requestAndroidPermission(permissionID: string): Promise<number> {
  return new Promise((resolve) => {
    plus.android.requestPermissions(
      [permissionID],
      (resultObj) => {
        let result = 0
        if (resultObj.granted.length > 0) result = 1
        if (resultObj.deniedAlways.length > 0) result = -1
        resolve(result)
      },
      (error) => {
        console.error(`申请权限错误：${error.code} = ${error.message}`)
        resolve(0)
      },
    )
  })
}

// 跳转到**应用**的权限页面
export const gotoAppPermissionSetting = () => {
  if (isIos) {
    const UIApplication = plus.ios.import('UIApplication')
    const application2 = UIApplication.sharedApplication()
    const NSURL2 = plus.ios.import('NSURL')
    const setting2 = NSURL2.URLWithString('app-settings:')
    application2.openURL(setting2)

    plus.ios.deleteObject(setting2)
    plus.ios.deleteObject(NSURL2)
    plus.ios.deleteObject(application2)
  } else {
    // Android 平台
    const Intent: any = plus.android.importClass('android.content.Intent')
    const Settings: any = plus.android.importClass('android.provider.Settings')
    const Uri: any = plus.android.importClass('android.net.Uri')
    const mainActivity: any = plus.android.runtimeMainActivity()

    // 构建 Intent，跳转到应用详情页面
    const intent = new Intent()
    intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
    const uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
    intent.setData(uri)
    mainActivity.startActivity(intent)
  }
}

// 检查系统的定位服务是否开启
function checkSystemEnableLocation(): boolean {
  if (isIos) {
    const cllocationManger = plus.ios.import('CLLocationManager')
    const result = cllocationManger.locationServicesEnabled()
    plus.ios.deleteObject(cllocationManger)
    return result
  } else {
    const context = plus.android.importClass('android.content.Context')
    const locationManager = plus.android.importClass('android.location.LocationManager')
    const main = plus.android.runtimeMainActivity()
    const mainSvr = main.getSystemService(context.LOCATION_SERVICE)
    return mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)
  }
}
