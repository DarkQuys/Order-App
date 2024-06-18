import { Spin } from "antd"
const LoadingComponent=({isLoading , children})=>{
    return (
        <Spin spinning={isLoading}>{children}</Spin>
    )
}
export default LoadingComponent