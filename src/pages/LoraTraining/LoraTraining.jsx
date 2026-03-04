import React, { useState, useRef } from 'react';
import {
  Upload,
  Image,
  X,
  Settings,
  ChevronDown,
  Play,
  FolderOpen,
  HelpCircle,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

// 训练参数默认值
const defaultTrainingParams = {
  // 训练轮次
  epochs: 10,
  maxSteps: 0,
  saveEveryNEpochs: 1,
  // 批处理
  batchSize: 4,
  gradientAccumulationSteps: 1,
  // 学习率
  learningRate: 1e-4,
  lrScheduler: 'cosine',
  warmupSteps: 100,
  // LoRA 网络
  networkRank: 64,
  networkAlpha: 32,
  clipSkip: 1,
  // 正则化
  weightDecay: 0.01,
  maxTokenLength: 256,
  // 图像
  resolution: 1024,
  enableBuckets: true,
};

// 学习率调度器选项
const lrSchedulers = [
  { id: 'constant', label: '恒定', description: '学习率保持不变' },
  { id: 'cosine', label: '余弦', description: '使用余弦曲线衰减' },
  { id: 'linear', label: '线性', description: '线性衰减学习率' },
  { id: 'polynomial', label: '多项式', description: '多项式曲线衰减' },
];

// 分辨率选项
const resolutions = [
  { id: 512, label: '512' },
  { id: 768, label: '768' },
  { id: 1024, label: '1024' },
];

// 工具提示组件 - 支持标题和描述
const Tooltip = ({ title, description, recommended, children }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 px-3 py-2.5 bg-gray-900 text-white text-xs rounded-lg z-50">
          {title && <div className="font-medium mb-1">{title}</div>}
          {description && <div className="text-gray-300 mb-1.5">{description}</div>}
          {recommended && <div className="text-primary-300 border-t border-gray-700 pt-1.5 mt-1.5">推荐: {recommended}</div>}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

// 数字输入组件 - 纯输入框
const NumberInput = ({ label, value, onChange, min, max, step = 1, tooltipConfig }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {tooltipConfig && (
          <Tooltip title={tooltipConfig.title} description={tooltipConfig.description} recommended={tooltipConfig.recommended}>
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        )}
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!isNaN(val)) onChange(Math.max(min, Math.min(max, val)));
        }}
        min={min}
        max={max}
        step={step}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500"
      />
    </div>
  );
};

// 开关组件
const Switch = ({ label, checked, onChange, tooltipConfig }) => {
  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {tooltipConfig && (
          <Tooltip title={tooltipConfig.title} description={tooltipConfig.description} recommended={tooltipConfig.recommended}>
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${
          checked ? 'bg-primary-600' : 'bg-gray-200'
        }`}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
};

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
  const [modalVisible, setModalVisible] = useState(false);

  // 弹窗动画控制
  React.useEffect(() => {
    if (showParamsModal) {
      setModalVisible(true);
    }
  }, [showParamsModal]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setShowParamsModal(false), 200);
  };

  // 训练参数状态
  const [trainingParams, setTrainingParams] = useState(defaultTrainingParams);
  const [lrSchedulerDropdownOpen, setLrSchedulerDropdownOpen] = useState(false);
  const lrSchedulerRef = useRef(null);

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
      if (lrSchedulerRef.current && !lrSchedulerRef.current.contains(event.target)) {
        setLrSchedulerDropdownOpen(false);
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
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${baseModelDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-150 origin-top ${baseModelDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
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
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${atlasDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-150 origin-top ${atlasDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
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
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${trainModeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-150 origin-top ${trainModeDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
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

      {/* 训练参数弹窗 */}
      {(showParamsModal || modalVisible) && (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${modalVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Card className={`w-[800px] max-h-[85vh] overflow-visible transition-all duration-200 ${modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">训练参数</h2>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 训练轮次 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                  训练轮次
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <NumberInput
                    label="Epochs"
                    value={trainingParams.epochs}
                    onChange={(v) => setTrainingParams({ ...trainingParams, epochs: v })}
                    min={1}
                    max={100}
                    tooltipConfig={{
                      title: '训练轮数',
                      description: '完整遍历数据集的次数。轮数越多，模型学习越充分，但训练时间越长。',
                      recommended: '10-20 轮'
                    }}
                  />
                  <NumberInput
                    label="Max Steps"
                    value={trainingParams.maxSteps}
                    onChange={(v) => setTrainingParams({ ...trainingParams, maxSteps: v })}
                    min={0}
                    max={10000}
                    step={100}
                    tooltipConfig={{
                      title: '最大训练步数',
                      description: '最大训练步数限制，0 表示不限制。通常与 Epochs 二选一使用。',
                      recommended: '0 (不限制)'
                    }}
                  />
                  <NumberInput
                    label="Save Every N"
                    value={trainingParams.saveEveryNEpochs}
                    onChange={(v) => setTrainingParams({ ...trainingParams, saveEveryNEpochs: v })}
                    min={1}
                    max={50}
                    tooltipConfig={{
                      title: '保存间隔',
                      description: '每 N 轮保存一次模型 checkpoint，方便选择最佳版本。',
                      recommended: '1-3 轮'
                    }}
                  />
                </div>
              </div>

              {/* 批处理 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                  批处理
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <NumberInput
                    label="Batch Size"
                    value={trainingParams.batchSize}
                    onChange={(v) => setTrainingParams({ ...trainingParams, batchSize: v })}
                    min={1}
                    max={64}
                    tooltipConfig={{
                      title: '批量大小',
                      description: '每次前向传播的样本数。越大显存占用越高，梯度估计越准确。',
                      recommended: '4-8 (8GB显存) / 16-32 (24GB显存)'
                    }}
                  />
                  <NumberInput
                    label="Gradient Acc"
                    value={trainingParams.gradientAccumulationSteps}
                    onChange={(v) => setTrainingParams({ ...trainingParams, gradientAccumulationSteps: v })}
                    min={1}
                    max={32}
                    tooltipConfig={{
                      title: '梯度累积',
                      description: '用于增大有效批量大小。在显存有限时，通过累积多个小批量的梯度来模拟大批量训练。',
                      recommended: '1-4'
                    }}
                  />
                </div>
              </div>

              {/* 学习率 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                  学习率
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Learning Rate</label>
                      <Tooltip title="学习率" description="模型参数更新的步长。越高收敛越快但可能不稳定，越低越稳定但收敛慢。" recommended="1e-4 ~ 5e-5">
                        <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <input
                      type="number"
                      value={trainingParams.learningRate}
                      onChange={(e) => setTrainingParams({ ...trainingParams, learningRate: Number(e.target.value) })}
                      step="0.00001"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">LR Scheduler</label>
                      <Tooltip title="学习率调度器" description="控制学习率随训练进程的变化策略。" recommended="cosine (余弦)">
                        <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <div className="relative" ref={lrSchedulerRef}>
                      <button
                        onClick={() => setLrSchedulerDropdownOpen(!lrSchedulerDropdownOpen)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer"
                      >
                        <span className="text-sm text-gray-700">
                          {lrSchedulers.find(s => s.id === trainingParams.lrScheduler)?.label || '余弦'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${lrSchedulerDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-150 origin-top ${lrSchedulerDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                        {lrSchedulers.map((scheduler) => (
                          <button
                            key={scheduler.id}
                            onClick={() => {
                              setTrainingParams({ ...trainingParams, lrScheduler: scheduler.id });
                              setLrSchedulerDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                              trainingParams.lrScheduler === scheduler.id ? 'bg-primary-50' : ''
                            }`}
                          >
                            <div className={`text-sm font-medium ${trainingParams.lrScheduler === scheduler.id ? 'text-primary-700' : 'text-gray-700'}`}>
                              {scheduler.label}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">{scheduler.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <NumberInput
                    label="Warmup Steps"
                    value={trainingParams.warmupSteps}
                    onChange={(v) => setTrainingParams({ ...trainingParams, warmupSteps: v })}
                    min={0}
                    max={1000}
                    tooltipConfig={{
                      title: '预热步数',
                      description: '训练初期逐渐增加学习率的步数，防止初期学习率过高导致训练不稳定。',
                      recommended: '100-500'
                    }}
                  />
                </div>
              </div>

              {/* LoRA 网络 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                  LoRA 网络
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <NumberInput
                    label="Network Rank"
                    value={trainingParams.networkRank}
                    onChange={(v) => setTrainingParams({ ...trainingParams, networkRank: v })}
                    min={1}
                    max={256}
                    tooltipConfig={{
                      title: 'LoRA 秩',
                      description: 'LoRA 降维矩阵的维度。越高能学习更多细节，但占用更多显存且可能过拟合。',
                      recommended: '32-128 (人物: 64-128, 风格: 16-64)'
                    }}
                  />
                  <NumberInput
                    label="Network Alpha"
                    value={trainingParams.networkAlpha}
                    onChange={(v) => setTrainingParams({ ...trainingParams, networkAlpha: v })}
                    min={1}
                    max={256}
                    tooltipConfig={{
                      title: 'LoRA Alpha',
                      description: 'LoRA 权重的缩放因子。通常设为 Rank 的一半，过高会过拟合。',
                      recommended: 'Rank 的一半'
                    }}
                  />
                  <NumberInput
                    label="Clip Skip"
                    value={trainingParams.clipSkip}
                    onChange={(v) => setTrainingParams({ ...trainingParams, clipSkip: v })}
                    min={1}
                    max={12}
                    tooltipConfig={{
                      title: 'CLIP 跳过层数',
                      description: '跳过 CLIP 模型的最后几层。较大的值可以让生成结果更偏向风格而非文本匹配。',
                      recommended: '1-2'
                    }}
                  />
                </div>
              </div>

              {/* 正则化 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                  正则化
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <NumberInput
                    label="Weight Decay"
                    value={trainingParams.weightDecay}
                    onChange={(v) => setTrainingParams({ ...trainingParams, weightDecay: v })}
                    min={0}
                    max={0.1}
                    step={0.001}
                    tooltipConfig={{
                      title: '权重衰减',
                      description: '防止模型参数过大导致过拟合。通常与 Adam 优化器配合使用。',
                      recommended: '0.01-0.05'
                    }}
                  />
                  <NumberInput
                    label="Max Token"
                    value={trainingParams.maxTokenLength}
                    onChange={(v) => setTrainingParams({ ...trainingParams, maxTokenLength: v })}
                    min={75}
                    max={512}
                    tooltipConfig={{
                      title: '最大 Token 数',
                      description: '提示词可以包含的最大 Token 数量，影响文本提示的详细程度。',
                      recommended: '225-256'
                    }}
                  />
                </div>
              </div>

              {/* 图像设置 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                  图像设置
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Resolution</label>
                      <Tooltip title="训练分辨率" description="训练图像的尺寸。更高的分辨率能保留更多细节，但训练更慢、显存需求更高。" recommended="1024 (推荐) / 768 (平衡)">
                        <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <div className="flex gap-2">
                      {resolutions.map((res) => (
                        <button
                          key={res.id}
                          onClick={() => setTrainingParams({ ...trainingParams, resolution: res.id })}
                          className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                            trainingParams.resolution === res.id
                              ? 'bg-primary-50 border-primary-200 text-primary-700'
                              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {res.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Switch
                    label="Enable Buckets"
                    checked={trainingParams.enableBuckets}
                    onChange={(v) => setTrainingParams({ ...trainingParams, enableBuckets: v })}
                    tooltipConfig={{
                      title: '启用图像桶',
                      description: '自动处理不同尺寸的图像，将相近尺寸的图像分到同一个 bucket 训练。',
                      recommended: '开启'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 弹窗底部按钮 */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <Button
                variant="secondary"
                onClick={() => setTrainingParams(defaultTrainingParams)}
              >
                重置默认
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowParamsModal(false)}
              >
                确认
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoraTraining;
