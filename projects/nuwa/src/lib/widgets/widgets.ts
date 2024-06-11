import {NuwaCollection} from "../nuwa";
import {ControlButton} from "./control/button";
import {BaseText} from "./base/text";
import {BaseRect} from "./base/rect";
import {BaseCircle} from "./base/circle";
import {BaseEllipse} from "./base/ellipse";
import {BaseImage} from "./base/image";
import {ControlNumber} from "./control/number";
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
import {MiscAMap} from "./misc/amap";
import {MiscVideo} from "./misc/video";
import {MiscTime} from "./misc/time";
import {ControlText} from "./control/text";
import {ControlTable} from "./control/table";

export const NuwaWidgets: NuwaCollection[] = [
    {
        name: "基础组件",
        components: [
            BaseRect, BaseCircle, BaseEllipse, BaseImage,
        ]
    },
    {
        name: "交互控件",
        components: [
            ControlText,
            ControlButton, ControlNumber, ControlInput,
            ControlSwitch, ControlProgress, ControlSelect,
            ControlSlider, ControlTable,
        ]
    },
    {
        name: "图表组件",
        components: [
            //Echarts,
            EchartsBar, EchartsLine, EchartsPie, EchartsGauge
        ]
    },
    {
        name: "其他组件",
        components: [
            //MiscFlow,
            MiscTime,
            MiscVideo,
            MiscWeather,
            MiscOutlet,
            MiscWeb,
            MiscAMap,
            //NinePatchImage,
        ]
    },
]
