import React, { useState, useRef } from 'react';
import {
  Upload,
  Image,
  X,
  Settings,
  ChevronDown,
  Play,
  FolderOpen,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

// 基础大模型选项
const baseModels = [
  { id: 'sdxl', label: 'SDXL' },
  { id: 'flux2-kein', label: 'Flux2-Kein' },
  { id: 'qwen2509', label: 'Qwen2509' },
  { id: 'qwen2511', label: 'Qwen2511' },
];

// 图集模式选项
const atlasModes = [
  { id: 'standard', label: '标准图集', description: '适合一般场景训练' },
  { id: 'subject', label: '主体图集', description: '适合人物、物体主体训练' },
  { id: 'style', label: '风格图集', description: '适合风格迁移训练' },
];

// 训练模式选项
const trainModes = [
  { id: 'fast', label: '快速训练', description: '适合测试预览' },
  { id: 'standard', label: '标准训练', description: '平衡质量和速度' },
  { id: 'quality', label: '高质量训练', description: '适合最终产出' },
];

const LoraTraining = ({ onNavigate }) => {
  const [loraName, setLoraName] = useState('');
  const [selectedBaseModel, setSelectedBaseModel] = useState(baseModels[0]);
  const [baseModelDropdownOpen, setBaseModelDropdownOpen] = useState(false);
  const [selectedAtlasMode, setSelectedAtlasMode] = useState(atlasModes[0]);
  const [atlasDropdownOpen, setAtlasDropdownOpen] = useState(false);
  const [selectedTrainMode, setSelectedTrainMode] = useState(trainModes[1]);
  const [trainModeDropdownOpen, setTrainModeDropdownOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showParamsModal, setShowParamsModal] = useState(false);

  const fileInputRef = useRef(null);
  const baseModelRef = useRef(null);
  const atlasRef = useRef(null);
  const trainModeRef = useRef(null);

  // 点击外部关闭下拉框
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (baseModelRef.current && !baseModelRef.current.contains(event.target)) {
        setBaseModelDropdownOpen(false);
      }
      if (atlasRef.current && !atlasRef.current.contains(event.target)) {
        setAtlasDropdownOpen(false);
      }
      if (trainModeRef.current && !trainModeRef.current.contains(event.target)) {
        setTrainModeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 处理文件上传
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  // 删除图片
  const removeImage = (id) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id));
  };

  // 开始训练
  const handleStartTraining = () => {
    // 跳转到模型页面，并触发训练
    onNavigate('models');
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* 主内容区域 */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* 左侧 - 上传训练数据 (占大部分) */}
        <div className="flex-1">
          <Card className="h-full">
            <div className="flex flex-col h-full">
              {/* 标题区域 */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">训练数据</h2>
                <span className="text-sm text-gray-500">
                  已上传 {uploadedImages.length} 张图片
                </span>
              </div>

              {/* 上传区域 */}
              <div
                className="flex-1 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {uploadedImages.length === 0 ? (
                  <>
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-primary-600" />
                    </div>
                    <p className="text-gray-900 font-medium mb-1">
                      点击或拖拽上传图片
                    </p>
                    <p className="text-sm text-gray-500">
                      支持 JPG、PNG 格式，建议 10-50 张图片
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full p-4 overflow-auto">
                    <div className="grid grid-cols-4 gap-3">
                      {uploadedImages.map((img) => (
                        <div
                          key={img.id}
                          className="aspect-square relative rounded-lg overflow-hidden group"
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(img.id);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                      {/* 添加更多图片按钮 */}
                      <div
                        className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        <div className="text-center">
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-400">添加更多</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* 右侧 - 参数调整 (占小部分) */}
        <div className="w-[360px] flex-shrink-0">
          <Card className="h-full flex flex-col">
            <div className="flex-1 space-y-4">
              {/* LoRA 名称 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">LoRA 名称</label>
                <input
                  type="text"
                  value={loraName}
                  onChange={(e) => setLoraName(e.target.value)}
                  placeholder="输入LoRA模型名称"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>

              {/* 基础大模型 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">基础大模型</label>
                <div className="relative" ref={baseModelRef}>
                  <button
                    onClick={() => setBaseModelDropdownOpen(!baseModelDropdownOpen)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {selectedBaseModel?.label}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${baseModelDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {baseModelDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {baseModels.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedBaseModel(model);
                            setBaseModelDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors cursor-pointer ${
                            selectedBaseModel?.id === model.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {model.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 图集模式 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">图集模式</label>
                <div className="relative" ref={atlasRef}>
                  <button
                    onClick={() => setAtlasDropdownOpen(!atlasDropdownOpen)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">
                        {selectedAtlasMode?.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {selectedAtlasMode?.description}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${atlasDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {atlasDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {atlasModes.map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setSelectedAtlasMode(mode);
                            setAtlasDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                            selectedAtlasMode?.id === mode.id ? 'bg-primary-50' : ''
                          }`}
                        >
                          <div className={`text-sm font-medium ${selectedAtlasMode?.id === mode.id ? 'text-primary-700' : 'text-gray-700'}`}>
                            {mode.label}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{mode.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 训练模式 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">训练模式</label>
                <div className="relative" ref={trainModeRef}>
                  <button
                    onClick={() => setTrainModeDropdownOpen(!trainModeDropdownOpen)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">
                        {selectedTrainMode?.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {selectedTrainMode?.description}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${trainModeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {trainModeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {trainModes.map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setSelectedTrainMode(mode);
                            setTrainModeDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                            selectedTrainMode?.id === mode.id ? 'bg-primary-50' : ''
                          }`}
                        >
                          <div className={`text-sm font-medium ${selectedTrainMode?.id === mode.id ? 'text-primary-700' : 'text-gray-700'}`}>
                            {mode.label}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{mode.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 训练参数按钮 */}
              <Button
                variant="secondary"
                className="w-full"
                leftIcon={<Settings className="w-4 h-4" />}
                onClick={() => setShowParamsModal(true)}
              >
                训练参数
              </Button>
            </div>

            {/* 开始训练按钮 - 固定在底部 */}
            <div className="mt-4">
              <Button
                variant="primary"
                className="w-full"
                leftIcon={<Play className="w-4 h-4" />}
                disabled={!loraName || uploadedImages.length === 0}
                onClick={handleStartTraining}
              >
                开始训练
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* 训练参数弹窗 (预留) */}
      {showParamsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[600px] max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">训练参数</h2>
              <button
                onClick={() => setShowParamsModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="text-center py-12 text-gray-500">
              训练面板开发中...
              参数设置
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoraTraining;
