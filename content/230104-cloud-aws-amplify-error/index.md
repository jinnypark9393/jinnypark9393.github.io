---
emoji: 💫
title: 'AWS Amplify에서 Module not found: Error: Can't resolve '@aws-amplify/ui-components' 에러'
date: '2023-01-04 15:51:00'
author: jinnypark9393
tags: aws
categories: 클라우드
---

# 1. 배경 상황

회사에서 팀 과제 때문에 Amplify Workshop을 따라하고 있었는데 예제 코드에서 라이브러리와 관련된 각종 Dependency에러가 발생했었다. 구글링으로 어찌저찌 해결하긴 했지만 기록하지 않으면 금방 까먹을 것 같아(이미 꽤 까먹었다) 포스팅으로 남겨둔다. 과연 나중에 또 필요할지는 의문이지만…

<br/>

참고로 Amplify에서 실습한 코드는 리액트(리액트 네이티브 아님)기반의 앱. 백엔드를 자동으로 생성해주는 Amplify 앱 특성상 백엔드 코드는 별도로 생성하지 않았다.

- 에러 1: AWS Amplify에서 Module not found: Error: Can't resolve '@aws-amplify/ui-components' 에러

<br/>

# 에러 1: AWS Amplify에서 Module not found: Error: Can't resolve '@aws-amplify/ui-components' 에러

샘플 코드를 참고해 App.js를 작성하고 `npm start` 로 프로젝트를 시작하려 하니 아래와 같은 에러 메시지가 발생했다.

```bash
Module not found: Error: Can't resolve '@aws-amplify/ui-components' in '/Users/jinipark/Downloads/github-related/capstone/traveldeals/src'
ERROR in ./src/App.js 9:0-76
Module not found: Error: Can't resolve '@aws-amplify/ui-components' in '/Users/jinipark/Downloads/github-related/capstone/traveldeals/src'

ERROR in ./src/App.js 13:0-17
export 'default' (imported as 'Amplify') was not found in 'aws-amplify' (possible exports: API, APIClass, AWSCloudWatchProvider, AWSKinesisFirehoseProvider, AWSKinesisProvider, AWSPinpointProvider, AmazonPersonalizeProvider, Amplify, Analytics, Auth, AuthModeStrategyType, Cache, ClientDevice, DataStore, Geo, Hub, I18n, Interactions, Logger, Notifications, Predicates, Predictions, PubSub, ServiceWorker, Signer, SortDirection, Storage, StorageClass, XR, graphqlOperation, syncExpression, withSSRContext)

ERROR in ./src/App.js 96:34-54
export 'AmplifyAuthenticator' (imported as 'AmplifyAuthenticator') was not found in '@aws-amplify/ui-react' (possible exports: AccountSettings, Alert, AmplifyProvider, Authenticator, Autocomplete, Badge, Button, ButtonGroup, Card, CheckboxField, Collection, ComponentClassNames, ComponentClassObject, ComponentPropsToStylePropsMap, ComponentPropsToStylePropsMapKeys, Divider, Expander, ExpanderItem, FieldGroupIcon, FieldGroupIconButton, FileUploader, Flex, Geocoder, Grid, Heading, HighlightMatch, Icon, Image, InAppMessageDisplay, InAppMessagingProvider, Link, Loader, LocationSearch, MapView, Menu, MenuButton, MenuItem, Pagination, PasswordField, PhoneNumberField, Placeholder, Radio, RadioGroupField, Rating, ScrollView, SearchField, SelectField, SliderField, StepperField, SwitchField, TabItem, Table, TableBody, TableCell, TableFoot, TableHead, TableRow, Tabs, Text, TextAreaField, TextField, ThemeProvider, ToggleButton, ToggleButtonGroup, View, VisuallyHidden, components, createTheme, defaultDarkModeOverride, defaultTheme, primitives, translations, useAmplify, useAuthenticator, useBreakpointValue, useInAppMessaging, usePagination, useTheme, withAuthenticator, withInAppMessaging)

ERROR in ./src/App.js 97:35-48
export 'AmplifySignUp' (imported as 'AmplifySignUp') was not found in '@aws-amplify/ui-react' (possible exports: AccountSettings, Alert, AmplifyProvider, Authenticator, Autocomplete, Badge, Button, ButtonGroup, Card, CheckboxField, Collection, ComponentClassNames, ComponentClassObject, ComponentPropsToStylePropsMap, ComponentPropsToStylePropsMapKeys, Divider, Expander, ExpanderItem, FieldGroupIcon, FieldGroupIconButton, FileUploader, Flex, Geocoder, Grid, Heading, HighlightMatch, Icon, Image, InAppMessageDisplay, InAppMessagingProvider, Link, Loader, LocationSearch, MapView, Menu, MenuButton, MenuItem, Pagination, PasswordField, PhoneNumberField, Placeholder, Radio, RadioGroupField, Rating, ScrollView, SearchField, SelectField, SliderField, StepperField, SwitchField, TabItem, Table, TableBody, TableCell, TableFoot, TableHead, TableRow, Tabs, Text, TextAreaField, TextField, ThemeProvider, ToggleButton, ToggleButtonGroup, View, VisuallyHidden, components, createTheme, defaultDarkModeOverride, defaultTheme, primitives, translations, useAmplify, useAuthenticator, useBreakpointValue, useInAppMessaging, usePagination, useTheme, withAuthenticator, withInAppMessaging)

webpack compiled with 4 errors
```

위 에러들은 amplify 관련 라이브러리 버전 때문에 발생한 에러였다. 실습 코드는 amplify 4버전대 이하를 기준으로 만들어진 코드인 듯 한데, 내가 설치한 amplify 라이브러리는 5버전대라 실습코드에서 사용하던 컴포넌트를 더 이상 지원하지 않아 에러가 발생했다.

<br/>

라이브러리 버전을 변경해 다시 설치하기 위해 package.json 파일에서 amplify 라이브러리 및 문제가 되는 라이브러리의 버전을 변경해준다. 내 코드에서 문제가 됐던 라이브러리는 amplify와 ui-react, ui-component였다.

```
{
  "name": "traveldeals",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@aws-amplify/ui-components": "^1.9.40",
    "@aws-amplify/ui-react": "^1.2.5",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "aws-amplify": "^4.3.43",
    "faker": "^6.6.6",
    "aws-sdk": "^2.1270.0",
    "minimist": "^1.2.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^5.3.4",
    "react-scripts": "5.0.1",
    "semantic-ui-react": "^2.1.4",
    "web-vitals": "^2.1.4"
  },
```

위와 같이 amplify 버전을 4.3.43, @aws-amplify/ui-components를 1.9.40, @aws-amplify/ui-react를 1.2.5버전으로 내려준다.

<br/>

그 다음 node_module 디렉터리 및 package-lock.json 파일을 삭제하고, `npm install` 명령어를 실행해 라이브러리를 다시 설치해준다.

<br/>

라이브러리 버전이 수정되었는지 확인하기 위해 아래 명령어를 실행해보자.

```bash
$ npm view aws-amplify versions
aws-amplify@4.3.43
```

<br/>

그러면 이제는 아래와 같은 에러만 남을 텐데, 이 에러는 Amplify 버전에 맞는 import 형식이 아니라 발생한 에러였다. 

```python
ERROR in ./src/App.js 13:0-17
export 'default' (imported as 'Amplify') was not found in 'aws-amplify' (possible exports: API, APIClass, AWSCloudWatchProvider, AWSKinesisFirehoseProvider, AWSKinesisProvider, AWSPinpointProvider, AmazonPersonalizeProvider, Amplify, Analytics, Auth, AuthModeStrategyType, Cache, ClientDevice, DataStore, Geo, Hub, I18n, Interactions, Logger, Notifications, Predicates, Predictions, PubSub, ServiceWorker, Signer, SortDirection, Storage, StorageClass, XR, graphqlOperation, syncExpression, withSSRContext)
```

<br/>

샘플 코드에서는 아래와 같은 형식으로 import가 되어있는데,

```jsx
import Amplify, { Auth } from 'aws-amplify';
```

<br/>

 aws-amplify 4.3.43버전에서는 Amplify도 `{}` 으로 넣어줘야헀다.

```jsx
import { Amplify, Auth } from 'aws-amplify';
```

이제 다시 `npm start` 로 로컬에서 프로젝트를 실행해보면 정상적으로 동작하는 것을 볼 수 있다.

<br/>