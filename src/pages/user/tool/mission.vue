<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="fv-page flex flex-col">
    <up-navbar
      class="mb-3"
      style=""
      title="任务中心"
      leftIcon="arrow-left"
      titleColor="#FFFFFFFF"
      bgColor="#FFFFFF00"
      titleWidth="400rpx"
      height="44px"
      leftIconSize="20px"
      leftIconColor="#FFFFFFFF"
      :safeAreaInsetTop="true"
      :fixed="true"
    ></up-navbar>
    <view
      class="flex box-border mb-3"
      :style="{
        url: '',
        position: 'static',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex1: 'auto',
        width: '100%',
        height: '200px',
        padding: '0px 10px 10px 10px',
        margin: '-15px 0px 12px 0px',
        color: '#333333',
        background: '#ffc000ff',
        borderRadius: '0px',
        borderColor: '#ffffff',
        borderWidth: '0px',
        borderStyle: 'solid',
        top: '',
        bottom: '',
        left: '',
        right: '',
      }"
    >
      <view
        class="flex box-border"
        style=""
        :style="{
          url: '',
          position: 'static',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex1: 'auto',
          width: '100%',
          height: '100%',
          padding: '10px',
          margin: '30px 0px 10px 0px',
          color: '#333333',
          background: '#ffffff00',
          borderRadius: '0px',
          borderColor: '#ffffff',
          borderWidth: '0px',
          borderStyle: 'solid',
          top: '',
          bottom: '',
          left: '',
          right: '',
        }"
      >
        <view
          class="flex box-border"
          style=""
          :style="{
            url: '',
            position: 'static',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex1: 'auto',
            width: '104px',
            height: '100px',
            padding: '10px 10px 10px 10px',
            margin: '0px 0px 0px 0px',
            color: '#333333',
            background: '#ffffffNaN',
            borderRadius: '0px',
            borderColor: '#ffffff',
            borderWidth: '0px',
            borderStyle: 'solid',
            top: '',
            bottom: '',
            left: '',
            right: '',
          }"
        >
          <up-text
            class=""
            style=""
            color="#FEFEFEFF"
            size="15px"
            text="我的积分"
            align="left"
            wordWrap="normal"
            :show="true"
            iconStyle="15px"
            decoration="none"
          ></up-text>
          <up-icon
            class=""
            style=""
            name="arrow-right"
            color="#FFFFFFFF"
            size="16px"
            labelPos="right"
            labelSize="15px"
            labelColor="#606266"
            space="3px"
            imgMode="aspectFill"
            width="100%"
            height="100%"
            :top="'0'"
          ></up-icon>
        </view>
        <up-text
          class=""
          style=""
          color="#FFFFFFFF"
          size="55px"
          text="1000"
          align="left"
          wordWrap="normal"
          :show="true"
          :bold="true"
          iconStyle="15px"
          decoration="none"
        ></up-text>
      </view>
      <view
        class="flex box-border"
        style=""
        :style="{
          url: '',
          position: 'static',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flex1: 'auto',
          width: '100%',
          height: '100%',
          padding: '0',
          margin: '0px 0px 15px 0px',
          color: '#333333',
          background: '#ffffff00',
          borderRadius: '0px',
          borderColor: '#ffffff',
          borderWidth: '0px',
          borderStyle: 'solid',
          top: '',
          bottom: '',
          left: '',
          right: '',
        }"
      >
        <up-image
          class="flex flex-row"
          style=""
          src="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
          mode="aspectFill"
          width="100px"
          height="100px"
          shape="circle"
          radius="0px"
          :lazyLoad="true"
          duration="500"
          bgColor="#f3f4f600"
          :showMenuByLongpress="true"
        ></up-image>
      </view>
    </view>
    <view
      class="flex box-border mb-3"
      style="z-index: 2"
      :style="{
        url: '',
        position: 'static',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex1: 'auto',
        width: 'auto',
        height: '100%',
        padding: '10px 10px 10px 10px',
        margin: '-25px 10px 0px 10px',
        color: '#333333',
        background: '#ffffffff',
        borderRadius: '10px',
        borderColor: '#ffffff',
        borderWidth: '0px',
        borderStyle: 'solid',
        top: '',
        bottom: '',
        left: '',
        right: '',
      }"
    >
      <view
        class="flex box-border"
        style=""
        :style="{
          url: '',
          position: 'static',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex1: 'auto',
          width: '100%',
          height: '100%',
          padding: '10px 10px 10px 10px',
          margin: '0px 0px 0px 0px',
          color: '#333333',
          background: '#ffffffNaN',
          borderRadius: '0px',
          borderColor: '#ffffff',
          borderWidth: '0px',
          borderStyle: 'solid',
          top: '',
          bottom: '',
          left: '',
          right: '',
        }"
      >
        <up-text
          class=""
          style="flex: none"
          color="#4B4B4BFF"
          size="14px"
          text="已连续签到"
          align="left"
          wordWrap="normal"
          :show="true"
          iconStyle="15px"
          decoration="none"
        ></up-text>
        <up-text
          class=""
          style=""
          color="#FF9A1FFF"
          size="13px"
          text="3"
          align="left"
          wordWrap="normal"
          :show="true"
          iconStyle="15px"
          decoration="none"
        ></up-text>
        <up-text
          class=""
          style=""
          color="#303133"
          size="13px"
          text="天"
          align="left"
          wordWrap="normal"
          :show="true"
          iconStyle="15px"
          decoration="none"
        ></up-text>
      </view>
      <view
        class="flex box-border"
        style=""
        :style="{
          url: '',
          position: 'static',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex1: 'auto',
          width: '100%',
          height: '100%',
          padding: '0px 0px 0px 0px',
          margin: '0px 0px 0px 0px',
          color: '#333333',
          background: '#ffffffNaN',
          borderRadius: '0px',
          borderColor: '#ffffff',
          borderWidth: '0px',
          borderStyle: 'solid',
          top: '',
          bottom: '',
          left: '',
          right: '',
        }"
      >
        <up-grid class="w-full" style="" col="7" align="居中" gap="5px">
          <up-grid-item class="py-2 rounded-md" style="" bgColor="#FFC000FF">
            <up-icon
              class=""
              style=""
              name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
              size="32px"
              width="23px"
              height="23px"
            ></up-icon>
            <up-text class="" style="" text="10" align="center" color="#F8F8F8FF"></up-text>
          </up-grid-item>
          <up-grid-item class="py-2 rounded-md" style="" bgColor="#E6E5E545">
            <up-icon
              class=""
              style=""
              name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
              size="32px"
              width="23px"
              height="23px"
            ></up-icon>
            <up-text class="" style="" text="10" align="center" color="#909399"></up-text>
          </up-grid-item>
          <up-grid-item class="py-2 rounded-md" style="" bgColor="#E6E5E545">
            <up-icon
              class=""
              style=""
              name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
              size="32px"
              height="23px"
              width="23px"
            ></up-icon>
            <up-text class="" style="" text="10" align="center" color="#909399"></up-text>
          </up-grid-item>
          <up-grid-item class="py-2 rounded-md" style="" bgColor="#E6E5E545">
            <up-icon
              class=""
              style=""
              name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
              size="32px"
              height="23px"
              width="23px"
            ></up-icon>
            <up-text class="" style="" text="10" align="center" color="#909399"></up-text>
          </up-grid-item>
          <up-grid-item class="py-2 rounded-md" style="" bgColor="#E6E5E545">
            <up-icon
              class=""
              style=""
              name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
              size="32px"
              width="23px"
              height="23px"
            ></up-icon>
            <up-text class="" style="" text="10" align="center" color="#909399"></up-text>
          </up-grid-item>
          <up-grid-item class="py-2 rounded-md" style="" bgColor="#E6E5E545">
            <up-icon
              class=""
              style=""
              name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
              size="32px"
              height="23px"
              width="23px"
            ></up-icon>
            <up-text class="" style="" text="10" align="center" color="#909399"></up-text>
          </up-grid-item>
          <up-grid-item class="py-2 rounded-md" style="" bgColor="#E6E5E545">
            <up-icon
              class=""
              style=""
              name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
              size="32px"
              height="23px"
              width="23px"
            ></up-icon>
            <up-text class="" style="" text="50" align="center" color="#909399"></up-text>
          </up-grid-item>
        </up-grid>
      </view>
      <view
        class="flex box-border"
        style=""
        :style="{
          url: '',
          position: 'static',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex1: 'auto',
          width: '100%',
          height: '100%',
          padding: '6px 10px 3px 10px',
          margin: '0px 0px 0px 0px',
          color: '#333333',
          background: '#ffffffNaN',
          borderRadius: '0px',
          borderColor: '#ffffff',
          borderWidth: '0px',
          borderStyle: 'solid',
          top: '',
          bottom: '',
          left: '',
          right: '',
        }"
      >
        <up-text
          class=""
          style=""
          color="#B3B1B1B0"
          size="13px"
          text="连续签到第7天可领50积分"
          align="left"
          wordWrap="normal"
          :show="true"
          iconStyle="15px"
          decoration="none"
        ></up-text>
      </view>
    </view>
    <view
      class="flex box-border mb-3"
      style=""
      :style="{
        url: '',
        position: 'static',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex1: 'auto',
        width: '100%',
        height: '100%',
        padding: '10px 10px 0px 10px',
        margin: '0px 0px 0px 0px',
        color: '#333333',
        background: '#86d9fc00',
        borderRadius: '0px',
        borderColor: '#ffffff',
        borderWidth: '0px',
        borderStyle: 'solid',
        top: '',
        bottom: '',
        left: '',
        right: '',
      }"
    >
      <view
        class="flex box-border mb-3"
        style=""
        :style="{
          url: '',
          position: 'static',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex1: 'auto',
          width: '100%',
          height: '100%',
          padding: '0',
          margin: '0px',
          color: '#333333',
          background: '#ffffffff',
          borderRadius: '10px',
          borderColor: '#ffffff',
          borderWidth: '10px',
          borderStyle: 'solid',
          top: '',
          bottom: '',
          left: '',
          right: '',
        }"
      >
        <view
          class="flex box-border"
          style=""
          :style="{
            url: '',
            position: 'static',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flex1: 'auto',
            width: '100%',
            height: '20px',
            padding: '0',
            margin: '0px 0px 0px 0px',
            color: '#333333',
            background: '#ffffffNaN',
            borderRadius: '0px',
            borderColor: '#ffffff',
            borderWidth: '0px',
            borderStyle: 'solid',
            top: '',
            bottom: '',
            left: '',
            right: '',
          }"
        >
          <up-text
            class=""
            style=""
            color="#303133"
            size="15px"
            text="每日任务"
            align="left"
            wordWrap="normal"
            :show="true"
            iconStyle="15px"
            decoration="none"
          ></up-text>
        </view>
        <view
          class="flex box-border"
          style=""
          :style="{
            url: '',
            position: 'static',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex1: 'auto',
            width: '100%',
            height: '100%',
            padding: '0',
            margin: '0px 0px 0px 0px',
            color: '#333333',
            background: '#ffffffNaN',
            borderRadius: '0px',
            borderColor: '#ffffff',
            borderWidth: '0px',
            borderStyle: 'solid',
            top: '',
            bottom: '',
            left: '',
            right: '',
          }"
        >
          <up-cell-group class="" style="">
            <up-cell class="" style="" title="阅读帖子" label="阅读一篇文章" :isLink="true">
              <template v-slot:right-icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '10px 10px 10px 10px',
                    margin: '0px 0px 0px 0px',
                    color: '#333333',
                    background: '#ffffffNaN',
                    borderRadius: '0px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <view
                    class="flex box-border"
                    style=""
                    :style="{
                      url: '',
                      position: 'static',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex1: 'auto',
                      width: '50px',
                      height: '100%',
                      padding: '10px 10px 10px 10px',
                      margin: '0px 10px 0px 0px',
                      color: '#333333',
                      background: '#ffffffNaN',
                      borderRadius: '0px',
                      borderColor: '#ffffff',
                      borderWidth: '0px',
                      borderStyle: 'solid',
                      top: '',
                      bottom: '',
                      left: '',
                      right: '',
                    }"
                  >
                    <up-icon
                      class=""
                      style=""
                      name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
                      color="#606266"
                      size="16px"
                      labelPos="right"
                      labelSize="15px"
                      labelColor="#606266"
                      space="3px"
                      imgMode="aspectFill"
                      width="23px"
                      height="23px"
                      :top="'0'"
                    ></up-icon>
                    <up-text
                      class=""
                      style=""
                      color="#303133"
                      size="13px"
                      text="10"
                      align="left"
                      wordWrap="normal"
                      :show="true"
                      iconStyle="15px"
                      decoration="none"
                    ></up-text>
                  </view>
                  <up-button
                    class=""
                    style=""
                    text="去完成"
                    type="primary"
                    shape="circle"
                    :plain="true"
                    size="mini"
                  ></up-button>
                </view>
              </template>
              <template v-slot:icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '15px',
                    margin: '0px 10px 0px 0px',
                    color: '#333333',
                    background: 'linear-gradient(90deg, #0c86f5ff 0%,#36b7ffff 100%)',
                    borderRadius: '100px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <up-icon
                    class=""
                    style=""
                    name="file-text"
                    color="#FFFFFFFF"
                    size="16px"
                    labelPos="right"
                    labelSize="15px"
                    labelColor="#606266"
                    space="3px"
                    imgMode="aspectFill"
                    width="100%"
                    height="100%"
                    :top="'0'"
                  ></up-icon>
                </view>
              </template>
            </up-cell>
            <up-cell class="" style="" title="评论点赞" label="对文章评论或点赞等" :isLink="true">
              <template v-slot:right-icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '10px 10px 10px 10px',
                    margin: '0px 0px 0px 0px',
                    color: '#333333',
                    background: '#ffffffNaN',
                    borderRadius: '0px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <view
                    class="flex box-border"
                    style=""
                    :style="{
                      url: '',
                      position: 'static',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex1: 'auto',
                      width: '50px',
                      height: '100%',
                      padding: '10px 10px 10px 10px',
                      margin: '0px 10px 0px 0px',
                      color: '#333333',
                      background: '#ffffffNaN',
                      borderRadius: '0px',
                      borderColor: '#ffffff',
                      borderWidth: '0px',
                      borderStyle: 'solid',
                      top: '',
                      bottom: '',
                      left: '',
                      right: '',
                    }"
                  >
                    <up-icon
                      class=""
                      style=""
                      name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
                      color="#606266"
                      size="16px"
                      labelPos="right"
                      labelSize="15px"
                      labelColor="#606266"
                      space="3px"
                      imgMode="aspectFill"
                      width="23px"
                      height="23px"
                      :top="'0'"
                    ></up-icon>
                    <up-text
                      class=""
                      style=""
                      color="#303133"
                      size="13px"
                      text="10"
                      align="left"
                      wordWrap="normal"
                      :show="true"
                      iconStyle="15px"
                      decoration="none"
                    ></up-text>
                  </view>
                  <up-button
                    class=""
                    style=""
                    text="去完成"
                    type="primary"
                    shape="circle"
                    :plain="true"
                    size="mini"
                  ></up-button>
                </view>
              </template>
              <template v-slot:icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '15px',
                    margin: '0px 10px 0px 0px',
                    color: '#333333',
                    background: 'linear-gradient(90deg, #f5520cff 0%,#fa8848ff 100%)',
                    borderRadius: '100px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <up-icon
                    class=""
                    style=""
                    name="file-text"
                    color="#FFFFFFFF"
                    size="16px"
                    labelPos="right"
                    labelSize="15px"
                    labelColor="#606266"
                    space="3px"
                    imgMode="aspectFill"
                    width="100%"
                    height="100%"
                    :top="'0'"
                  ></up-icon>
                </view>
              </template>
            </up-cell>
            <up-cell
              class=""
              style=""
              title="发布一篇文章"
              label="发布一篇文章或者视频"
              :isLink="true"
            >
              <template v-slot:right-icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '10px 10px 10px 10px',
                    margin: '0px 0px 0px 0px',
                    color: '#333333',
                    background: '#ffffffNaN',
                    borderRadius: '0px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <view
                    class="flex box-border"
                    style=""
                    :style="{
                      url: '',
                      position: 'static',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex1: 'auto',
                      width: '50px',
                      height: '100%',
                      padding: '10px 10px 10px 10px',
                      margin: '0px 10px 0px 0px',
                      color: '#333333',
                      background: '#ffffffNaN',
                      borderRadius: '0px',
                      borderColor: '#ffffff',
                      borderWidth: '0px',
                      borderStyle: 'solid',
                      top: '',
                      bottom: '',
                      left: '',
                      right: '',
                    }"
                  >
                    <up-icon
                      class=""
                      style=""
                      name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
                      color="#606266"
                      size="16px"
                      labelPos="right"
                      labelSize="15px"
                      labelColor="#606266"
                      space="3px"
                      imgMode="aspectFill"
                      width="23px"
                      height="23px"
                      :top="'0'"
                    ></up-icon>
                    <up-text
                      class=""
                      style=""
                      color="#303133"
                      size="13px"
                      text="10"
                      align="left"
                      wordWrap="normal"
                      :show="true"
                      iconStyle="15px"
                      decoration="none"
                    ></up-text>
                  </view>
                  <up-button
                    class=""
                    style=""
                    text="去完成"
                    type="primary"
                    shape="circle"
                    :plain="true"
                    size="mini"
                  ></up-button>
                </view>
              </template>
              <template v-slot:icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '15px',
                    margin: '0px 10px 0px 0px',
                    color: '#333333',
                    background: 'linear-gradient(90deg, #b80cf5ff 0%,#9648faff 100%)',
                    borderRadius: '100px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <up-icon
                    class=""
                    style=""
                    name="file-text"
                    color="#FFFFFFFF"
                    size="16px"
                    labelPos="right"
                    labelSize="15px"
                    labelColor="#606266"
                    space="3px"
                    imgMode="aspectFill"
                    width="100%"
                    height="100%"
                    :top="'0'"
                  ></up-icon>
                </view>
              </template>
            </up-cell>
            <up-cell
              class=""
              style=""
              title="发布一篇文章"
              label="发布一篇文章或者视频"
              :isLink="true"
            >
              <template v-slot:right-icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '10px 10px 10px 10px',
                    margin: '0px 0px 0px 0px',
                    color: '#333333',
                    background: '#ffffffNaN',
                    borderRadius: '0px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <view
                    class="flex box-border"
                    style=""
                    :style="{
                      url: '',
                      position: 'static',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex1: 'auto',
                      width: '50px',
                      height: '100%',
                      padding: '10px 10px 10px 10px',
                      margin: '0px 10px 0px 0px',
                      color: '#333333',
                      background: '#ffffffNaN',
                      borderRadius: '0px',
                      borderColor: '#ffffff',
                      borderWidth: '0px',
                      borderStyle: 'solid',
                      top: '',
                      bottom: '',
                      left: '',
                      right: '',
                    }"
                  >
                    <up-icon
                      class=""
                      style=""
                      name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
                      color="#606266"
                      size="16px"
                      labelPos="right"
                      labelSize="15px"
                      labelColor="#606266"
                      space="3px"
                      imgMode="aspectFill"
                      width="23px"
                      height="23px"
                      :top="'0'"
                    ></up-icon>
                    <up-text
                      class=""
                      style=""
                      color="#303133"
                      size="13px"
                      text="10"
                      align="left"
                      wordWrap="normal"
                      :show="true"
                      iconStyle="15px"
                      decoration="none"
                    ></up-text>
                  </view>
                  <up-button
                    class=""
                    style=""
                    text="去完成"
                    type="primary"
                    shape="circle"
                    :plain="true"
                    size="mini"
                  ></up-button>
                </view>
              </template>
              <template v-slot:icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '15px',
                    margin: '0px 10px 0px 0px',
                    color: '#333333',
                    background: 'linear-gradient(90deg, #0cf55bff 0%,#13b032ff 100%)',
                    borderRadius: '100px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <up-icon
                    class=""
                    style=""
                    name="file-text"
                    color="#FFFFFFFF"
                    size="16px"
                    labelPos="right"
                    labelSize="15px"
                    labelColor="#606266"
                    space="3px"
                    imgMode="aspectFill"
                    width="100%"
                    height="100%"
                    :top="'0'"
                  ></up-icon>
                </view>
              </template>
            </up-cell>
            <up-cell
              class=""
              style=""
              title="发布一篇文章"
              label="发布一篇文章或者视频"
              :isLink="true"
            >
              <template v-slot:right-icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '10px 10px 10px 10px',
                    margin: '0px 0px 0px 0px',
                    color: '#333333',
                    background: '#ffffffNaN',
                    borderRadius: '0px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <view
                    class="flex box-border"
                    style=""
                    :style="{
                      url: '',
                      position: 'static',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex1: 'auto',
                      width: '50px',
                      height: '100%',
                      padding: '10px 10px 10px 10px',
                      margin: '0px 10px 0px 0px',
                      color: '#333333',
                      background: '#ffffffNaN',
                      borderRadius: '0px',
                      borderColor: '#ffffff',
                      borderWidth: '0px',
                      borderStyle: 'solid',
                      top: '',
                      bottom: '',
                      left: '',
                      right: '',
                    }"
                  >
                    <up-icon
                      class=""
                      style=""
                      name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
                      color="#606266"
                      size="16px"
                      labelPos="right"
                      labelSize="15px"
                      labelColor="#606266"
                      space="3px"
                      imgMode="aspectFill"
                      width="23px"
                      height="23px"
                      :top="'0'"
                    ></up-icon>
                    <up-text
                      class=""
                      style=""
                      color="#303133"
                      size="13px"
                      text="10"
                      align="left"
                      wordWrap="normal"
                      :show="true"
                      iconStyle="15px"
                      decoration="none"
                    ></up-text>
                  </view>
                  <up-button
                    class=""
                    style=""
                    text="去完成"
                    type="primary"
                    shape="circle"
                    :plain="true"
                    size="mini"
                  ></up-button>
                </view>
              </template>
              <template v-slot:icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '15px',
                    margin: '0px 10px 0px 0px',
                    color: '#333333',
                    background: 'linear-gradient(90deg, #e02bd8ff 0%,#eb386eff 100%)',
                    borderRadius: '100px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <up-icon
                    class=""
                    style=""
                    name="file-text"
                    color="#FFFFFFFF"
                    size="16px"
                    labelPos="right"
                    labelSize="15px"
                    labelColor="#606266"
                    space="3px"
                    imgMode="aspectFill"
                    width="100%"
                    height="100%"
                    :top="'0'"
                  ></up-icon>
                </view>
              </template>
            </up-cell>
            <up-cell
              class=""
              style=""
              title="发布一篇文章"
              label="发布一篇文章或者视频"
              :isLink="true"
            >
              <template v-slot:right-icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '10px 10px 10px 10px',
                    margin: '0px 0px 0px 0px',
                    color: '#333333',
                    background: '#ffffffNaN',
                    borderRadius: '0px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <view
                    class="flex box-border"
                    style=""
                    :style="{
                      url: '',
                      position: 'static',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex1: 'auto',
                      width: '50px',
                      height: '100%',
                      padding: '10px 10px 10px 10px',
                      margin: '0px 10px 0px 0px',
                      color: '#333333',
                      background: '#ffffffNaN',
                      borderRadius: '0px',
                      borderColor: '#ffffff',
                      borderWidth: '0px',
                      borderStyle: 'solid',
                      top: '',
                      bottom: '',
                      left: '',
                      right: '',
                    }"
                  >
                    <up-icon
                      class=""
                      style=""
                      name="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
                      color="#606266"
                      size="16px"
                      labelPos="right"
                      labelSize="15px"
                      labelColor="#606266"
                      space="3px"
                      imgMode="aspectFill"
                      width="23px"
                      height="23px"
                      :top="'0'"
                    ></up-icon>
                    <up-text
                      class=""
                      style=""
                      color="#303133"
                      size="13px"
                      text="10"
                      align="left"
                      wordWrap="normal"
                      :show="true"
                      iconStyle="15px"
                      decoration="none"
                    ></up-text>
                  </view>
                  <up-button
                    class=""
                    style=""
                    text="去完成"
                    type="primary"
                    shape="circle"
                    :plain="true"
                    size="mini"
                  ></up-button>
                </view>
              </template>
              <template v-slot:icon>
                <view
                  class="flex box-border"
                  style=""
                  :style="{
                    url: '',
                    position: 'static',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex1: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '15px',
                    margin: '0px 10px 0px 0px',
                    color: '#333333',
                    background: 'linear-gradient(90deg, #2b9fe0ff 0%,#38cbebff 100%)',
                    borderRadius: '100px',
                    borderColor: '#ffffff',
                    borderWidth: '0px',
                    borderStyle: 'solid',
                    top: '',
                    bottom: '',
                    left: '',
                    right: '',
                  }"
                >
                  <up-icon
                    class=""
                    style=""
                    name="file-text"
                    color="#FFFFFFFF"
                    size="16px"
                    labelPos="right"
                    labelSize="15px"
                    labelColor="#606266"
                    space="3px"
                    imgMode="aspectFill"
                    width="100%"
                    height="100%"
                    :top="'0'"
                  ></up-icon>
                </view>
              </template>
            </up-cell>
          </up-cell-group>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup></script>
