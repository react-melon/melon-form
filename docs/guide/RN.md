# 手百 RN 调研需求梳理

## RN 调研

### 开发效率

H5 >= RN > NA

### 发版本效率

H5 = RN > NA

### 性能

#### 内存占用对比：

H5 >> RN >= NA

#### CPU占用对比：

H5 >> RN > NA

#### 启动时间对比：

H5 >> RN >= NA

### 依赖关系

RN 和 H5-Hybrid 都需要依赖 NA 功能。

### 推荐的开发模式

1. NA 同学开发必要的基础 NA 模块，向上提供基础 API，**不做界面** **不做业务逻辑**
2. RN / Hybrid 完成可视页面和业务逻辑

## 接入

[接入指南](http://agroup.baidu.com/baidu-rn/md/article/123568?side=folder)

1. js

    只需要给手百提供标准的 icode 项目即可

2. NA 模块

    业务方需自行封装端能力，提供给手百端上的同学。

## 开发

### 环境搭建

1. [官方 RN 环境搭建](https://facebook.github.io/react-native/docs/getting-started.html)
2. [手百环境搭建](http://agroup.baidu.com/baidu-rn/md/article/135073?side=folder)
3. [手百壳工程](http://agroup.baidu.com/baidu-rn/md/article/98571?side=folder)

### 手百 RN 内置功能梳理

1. [官方 RN 功能](https://facebook.github.io/react-native)
2. [手百 NA 功能](http://agroup.baidu.com/baidu-rn/md/article/102589?side=folder)
    + app state listener
        + leave
        + enter
        + destory
        + toolbar action
    + network status
    + cuid
    + fonts
    + close RN
    + invoke webview
    + invoke external app
    + invoke internal module
        + account
            + login
            + logout
            + getInfo
        + feedback
        + share
    + Subscribe
        + add
        + remove
    + ABTest
        + getSwitch
        + getAllSwitch
3. [手百 JS 组件](http://agroup.baidu.com/baidu-rn/md/article/121123?side=folder)
    + AdBanner
    + Button
    + BDListView
    + Carousel
    + Dialog
    + Dropdown
    + GoBack
    + IconFont
    + LoginBar
    + NavBar
    + NavigationCarousel
    + NetError
    + NSBar
    + PullToRefresh
    + SearchBox
    + Suggestion
    + Tab
    + Toast
    + Video

### JS 开发规范

[开发注意事项](http://agroup.baidu.com/baidu-rn/md/article/137184?side=folder)

### NA 模块开发

1. 官方 Native Module 开发指南
    + [iOS](http://facebook.github.io/react-native/docs/native-modules-ios.html)
    + [Android](http://facebook.github.io/react-native/docs/native-modules-android.html)
2. 官方 Native UI Component 开发指南     
    + [iOS](http://facebook.github.io/react-native/docs/native-components-ios.html)
    + [Android](http://facebook.github.io/react-native/docs/native-components-android.html)

3. 手百 NA 模块开发指南

待补充

## 发版

1. JS Bundle
    手百同学通过操作 jenkins 发版本

2. NA 模块发布
    业务方需自行封装端能力，提供给手百端上的同学。

3. ABTest
    待补充

## 性能调优
待补充

## Crash 上报

[手百 Crash 上报](http://agroup.baidu.com/baidu-rn/md/article/133983?side=folder)

1. 不在 try ... catch 中

    手百会在全局 catch 异常，自行上报

2. 在 try ... catch 中

    catch 到异常后业务自行上报

## 其他注意事项
待补充
