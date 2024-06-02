import {NuwaCollection} from "../nuwa";
import {BaseLine} from "./base/line";
import {ControlButton} from "./control/button";
import {BaseText} from "./base/text";
import {BaseRect} from "./base/rect";
import {BaseCircle} from "./base/circle";
import {BaseEllipse} from "./base/ellipse";
import {BaseImage} from "./base/image";
import {ControlNumber} from "./control/number";
import {Echarts} from "./echarts/echarts";
import {EchartsBar} from "./echarts/echarts-bar";
import {EchartsGauge} from "./echarts/echarts-gauge";
import {EchartsLine} from "./echarts/echarts-line";
import {EchartsPie} from "./echarts/echarts-pie";
import {ControlInput} from "./control/input";
import {ControlSwitch} from "./control/switch";
import {ControlProgress} from "./control/progress";
import {ControlSelect} from "./control/select";
import {ControlSlider} from "./control/slider";
import {MiscWeb} from "./misc/web";
import {MiscOutlet} from "./misc/outlet";
import {MiscWeather} from "./misc/weather";
import {MiscFlow} from "./misc/flow";
import {MiscAMap} from "./misc/amap";
import {NinePatchImage} from "./misc/9.patch";
import {MiscVideo} from "./misc/video";

export const NuwaWidgets: NuwaCollection[] = [
    {
        name: "基础组件",
        components: [
            //BaseLine,
            BaseText, BaseRect,
            BaseCircle, BaseEllipse, BaseImage,
        ]
    },
    {
        name: "交互控件",
        components: [
            ControlButton, ControlNumber, ControlInput,
            ControlSwitch, ControlProgress, ControlSelect,
            ControlSlider
        ]
    },
    {
        name: "图表组件",
        components: [
            Echarts, EchartsBar, EchartsGauge, EchartsLine, EchartsPie
        ]
    },
    {
        name: "其他组件",
        components: [
            //MiscFlow,
            MiscVideo,
            MiscWeather,
            MiscOutlet,
            MiscWeb,
            MiscAMap,
            //NinePatchImage,
        ]
    },
]
