import React from "react";

let Icons = require("@ant-design/icons");
let _util = require("@idraw/studio/lib/studio/mods/sider-left/data/util");

const defaultIconsProps = {
  style: {
    fontSize: 28,
    color: "#666666",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}

const iconConfigList = [
  {
    name: 'ArrowUp',
    comp: React.createElement(Icons.ArrowUpOutlined, defaultIconsProps)
  }, {
    name: 'ArrowDown',
    comp: React.createElement(Icons.ArrowDownOutlined, defaultIconsProps)
  }, {
    name: 'ArrowLeft',
    comp: React.createElement(Icons.ArrowLeftOutlined, defaultIconsProps)
  }, {
    name: 'ArrowRight',
    comp: React.createElement(Icons.ArrowRightOutlined, defaultIconsProps)
  }, {
    name: 'Check',
    comp: React.createElement(Icons.CheckCircleOutlined, defaultIconsProps)
  }, {
    name: 'Close',
    comp: React.createElement(Icons.CloseCircleOutlined, defaultIconsProps)
  }, {
    name: 'Minus',
    comp: React.createElement(Icons.MinusOutlined, defaultIconsProps)
  }, {
    name: 'Plus',
    comp: React.createElement(Icons.PlusOutlined, defaultIconsProps)
  }, {
    name: 'Smile',
    comp: React.createElement(Icons.SmileOutlined, defaultIconsProps)
  }, {
    name: 'Meh',
    comp: React.createElement(Icons.MehOutlined, defaultIconsProps)
  }, {
    name: 'Frown',
    comp: React.createElement(Icons.FrownOutlined, defaultIconsProps)
  }, {
    name: 'Info',
    comp: React.createElement(Icons.InfoCircleOutlined, defaultIconsProps)
  }, {
    name: 'Setting',
    comp: React.createElement(Icons.SettingOutlined, defaultIconsProps)
  }, {
    name: 'Save',
    comp: React.createElement(Icons.SaveOutlined, defaultIconsProps)
  }, {
    name: 'Control',
    comp: React.createElement(Icons.ControlOutlined, defaultIconsProps)
  }, {
    name: 'Code',
    comp: React.createElement(Icons.CodeOutlined, defaultIconsProps)
  }, {
    name: 'AreaChart',
    comp: React.createElement(Icons.AreaChartOutlined, defaultIconsProps)
  }, {
    name: 'LineChart',
    comp: React.createElement(Icons.LineChartOutlined, defaultIconsProps)
  }, {
    name: 'BarChart',
    comp: React.createElement(Icons.BarChartOutlined, defaultIconsProps)
  }, {
    name: 'PieChart',
    comp: React.createElement(Icons.PieChartOutlined, defaultIconsProps)
  }, {
    name: 'User',
    comp: React.createElement(Icons.UserOutlined, defaultIconsProps)
  }, {
    name: 'UserAdd',
    comp: React.createElement(Icons.UserAddOutlined, defaultIconsProps)
  }, {
    name: 'UserDelete',
    comp: React.createElement(Icons.UserDeleteOutlined, defaultIconsProps)
  }, {
    name: 'Team',
    comp: React.createElement(Icons.TeamOutlined, defaultIconsProps)
  }, {
    name: 'FileDone',
    comp: React.createElement(Icons.FileDoneOutlined, defaultIconsProps)
  }, {
    name: 'FileAdd',
    comp: React.createElement(Icons.FileAddOutlined, defaultIconsProps)
  }, {
    name: 'FileSync',
    comp: React.createElement(Icons.FileSyncOutlined, defaultIconsProps)
  }, {
    name: 'FileText',
    comp: React.createElement(Icons.FileTextOutlined, defaultIconsProps)
  }, {
    name: 'FileExcel',
    comp: React.createElement(Icons.FileExcelOutlined, defaultIconsProps)
  }, {
    name: 'FileGif',
    comp: React.createElement(Icons.FileGifOutlined, defaultIconsProps)
  }, {
    name: 'FilePDF',
    comp: React.createElement(Icons.FilePdfOutlined, defaultIconsProps)
  }, {
    name: 'FilePPT',
    comp: React.createElement(Icons.FilePptOutlined, defaultIconsProps)
  }, {
    name: 'FileMarkdown',
    comp: React.createElement(Icons.FileMarkdownOutlined, defaultIconsProps)
  }, {
    name: 'FileUnknown',
    comp: React.createElement(Icons.FileUnknownOutlined, defaultIconsProps)
  }, {
    name: 'FileZip',
    comp: React.createElement(Icons.FileZipOutlined, defaultIconsProps)
  }
]

function createElementData(params: typeof iconConfigList[0]) {

  return {
    name: params.name,
    icon: params.comp,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0,
      type: 'svg',
      desc: {
        svg: _util.parseReactToSVG(params.comp)
      },
      extension: {
        subType: 'svg-custom-color',
        currentColor: '#4A90E2FF'
      }
    }
  }
}

export const IconList = iconConfigList.map((item) => {
  return createElementData(item);
})