# render

## 什么是渲染？

把【模版】+【数据】拼接到一起

## 传统的服务端渲染

早期的web页面渲染都是在服务端进行的

缺点：

- 前后端代码完全耦合在一起，不利于开发和维护
- 前端没有足够的发挥空间
- 服务端压力大
- 用户体验一般

## 客户端渲染（csr）

- 后端负责处理数据接口
- 前端负责将接口数据渲染到页面中

优点：

- 更为独立，不再受限制于后端

缺点

- 首屏渲染慢
- 不利于SEO

### 首屏渲染慢

csr至少要经历三个周期

1. 请求html
2. 执行script，加载html所需js、css
3. 请求动态数据

ssr首屏直出，将渲染好的html直接返回

### 不利于SEO

搜索引擎获取csr的html，此时html内容几乎为空，并不会执行script去加载，请求html所需内容进行填充

## 现代化的服务端渲染（ssr）

同构渲染 = 后端渲染 + 前端渲染

- 基于react/vue等框架，客户端渲染和服务端渲染的结合
  - 在服务端执行一次，用于实现服务端渲染
  - 在客户端再执行一次，用于接管用户交互
- 核心解决SEO和首屏渲染慢的问题
- 拥有传统服务端渲染的有点，也有客户端渲染的优点