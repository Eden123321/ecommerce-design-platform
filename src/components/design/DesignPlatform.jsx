import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingCart,
  Palette,
  Sparkles,
  Image,
  Zap,
  Layout,
  Download,
  ChevronDown,
  X,
  Clock,
  Star,
  TrendingUp,
  Upload,
  FileImage,
} from 'lucide-react';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';

// 行业选项
const industries = [
  { id: 'ecommerce', label: '电商', icon: ShoppingCart, color: 'bg-blue-500' },
  { id: 'beauty', label: '美妆', icon: Palette, color: 'bg-pink-500' },
  { id: 'fashion', label: '服装', icon: ShoppingCart, color: 'bg-purple-500' },
  { id: 'food', label: '食品', icon: ShoppingCart, color: 'bg-orange-500' },
  { id: 'digital', label: '数码', icon: ShoppingCart, color: 'bg-cyan-500' },
  { id: 'home', label: '家居', icon: ShoppingCart, color: 'bg-green-500' },
];

// 风格选项
const styleOptions = [
  { id: 'flat', label: '扁平风格', description: '简洁明了，无阴影' },
  { id: 'minimal', label: '极简风格', description: '大量留白，元素精简' },
  { id: 'modern', label: '现代风格', description: '色彩鲜明，层次分明' },
  { id: 'retro', label: '复古风格', description: '怀旧色调，经典元素' },
  { id: 'luxury', label: '轻奢风格', description: '高级质感，低调奢华' },
  { id: 'playful', label: '活泼风格', description: '色彩丰富，趣味性强' },
];

// 生成历史模拟数据
const generateHistory = [
  { id: 1, industry: '电商', style: '扁平', time: '10分钟前', status: 'success' },
  { id: 2, industry: '美妆', style: '极简', time: '30分钟前', status: 'success' },
  { id: 3, industry: '服装', style: '现代', time: '1小时前', status: 'success' },
];

// 下拉选择器组件
const DropdownSelector = ({ label, selected, options, onSelect, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer
          ${selected
            ? 'bg-primary-50 border-primary-200 text-primary-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
          }
        `}
      >
        <Icon className={`w-5 h-5 ${selected ? 'text-primary-600' : 'text-gray-500'}`} />
        <span className="text-sm font-medium">
          {selected ? selected.label : label}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer
                  ${selected?.id === option.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${option.color || 'bg-gray-100'}`}>
                  <option.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-gray-500">{option.description}</div>
                  )}
                </div>
                {selected?.id === option.id && (
                  <div className="w-2 h-2 rounded-full bg-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 生成进度指示器
const GenerationProgress = ({ progress, stage }) => {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="relative w-20 h-20 mb-4">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.26} 226`}
            className="text-primary-600 transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-primary-600">{progress}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900 mb-1">{stage}</p>
        <p className="text-xs text-gray-500">请稍候，AI 正在为您生成...</p>
      </div>
    </div>
  );
};

// 图片预览卡片
const ImagePreviewCard = ({ image, onDownload, onRegenerate }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        {image ? (
          <img src={image} alt="生成结果" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">暂无预览</p>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="success">生成成功</Badge>
            <span className="text-xs text-gray-500">1024 × 1024</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRegenerate}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              重新生成
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              下载
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 图片比例选项
const aspectRatioOptions = [
  { id: '1:1', label: '1:1', description: '方形' },
  { id: '16:9', label: '16:9', description: '横版' },
  { id: '9:16', label: '9:16', description: '竖版' },
  { id: '4:3', label: '4:3', description: '标准' },
];

const DesignPlatform = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [generatedResult, setGeneratedResult] = useState(null);
  const [rightTab, setRightTab] = useState('result'); // 'result' | 'history'
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setReferenceImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleGenerate = async () => {
    if (!selectedIndustry || !selectedStyle) {
      alert('请至少选择行业和风格');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setStage('正在分析需求...');

    // 模拟生成过程
    const stages = [
      { progress: 20, stage: '正在分析需求...' },
      { progress: 40, stage: '匹配设计风格...' },
      { progress: 60, stage: '生成设计草图...' },
      { progress: 80, stage: '优化细节...' },
      { progress: 100, stage: '完成！' },
    ];

    for (const item of stages) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(item.progress);
      setStage(item.stage);
    }

    setGeneratedResult({
      id: Date.now(),
      industry: selectedIndustry.label,
      style: selectedStyle.label,
      prompt: prompt,
      referenceImage: referenceImage,
      aspectRatio: selectedAspectRatio,
      time: '刚刚',
    });

    setIsGenerating(false);
  };

  const handleReset = () => {
    setSelectedIndustry(null);
    setSelectedStyle(null);
    setPrompt('');
    setReferenceImage(null);
    setSelectedAspectRatio('1:1');
    setGeneratedResult(null);
    setProgress(0);
  };

  return (
    <div className="p-6 h-full">
      <div className="flex gap-6 h-full">
        {/* 左侧 - 用户输入区域 */}
        <div className="w-[480px] flex-shrink-0">
          <Card className="h-full">
            <div className="flex flex-col h-full">
              <div className="space-y-5 flex-1 overflow-auto">
                {/* 上传参考图 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">上传参考图</label>
                  {referenceImage ? (
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img src={referenceImage} alt="参考图" className="w-full h-full object-cover" />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">点击或拖拽上传</span>
                      <span className="text-xs text-gray-400 mt-1">支持 JPG、PNG 格式</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* 输入提示词 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">输入提示词</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="描述您想要的图片内容..."
                    rows={10}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                  />
                </div>

                {/* 选择行业 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">选择行业</label>
                  <div className="grid grid-cols-3 gap-2">
                    {industries.map((industry) => {
                      const Icon = industry.icon;
                      return (
                        <button
                          key={industry.id}
                          onClick={() => setSelectedIndustry(industry)}
                          className={`
                            px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer
                            ${selectedIndustry?.id === industry.id
                              ? 'bg-primary-50 border-primary-200 text-primary-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                            }
                          `}
                        >
                          {industry.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 选择风格 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">选择风格</label>
                  <div className="grid grid-cols-3 gap-2">
                    {styleOptions.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        className={`
                          px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer
                          ${selectedStyle?.id === style.id
                            ? 'bg-primary-50 border-primary-200 text-primary-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                          }
                        `}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 图片比例 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">图片比例</label>
                  <div className="grid grid-cols-4 gap-2">
                    {aspectRatioOptions.map((ratio) => (
                      <button
                        key={ratio.id}
                        onClick={() => setSelectedAspectRatio(ratio.id)}
                        className={`
                          px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer
                          ${selectedAspectRatio === ratio.id
                            ? 'bg-primary-50 border-primary-200 text-primary-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                          }
                        `}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || (!selectedIndustry && !selectedStyle)}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer mt-4
                  ${!selectedIndustry || !selectedStyle
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-primary-600 text-white hover:from-primary-700 hover:to-primary-700 shadow-lg shadow-primary-500/25'
                  }
                `}
              >
                <Sparkles className="w-5 h-5" />
                {isGenerating ? '生成中...' : 'AI 生成图片'}
              </button>
            </div>
          </Card>
        </div>

        {/* 右侧 - 生成结果和历史记录 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tab 切换 */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setRightTab('result')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${rightTab === 'result'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              生成结果
            </button>
            <button
              onClick={() => setRightTab('history')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${rightTab === 'history'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              生成历史
            </button>
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <Card className="flex-1">
              <GenerationProgress progress={progress} stage={stage} />
            </Card>
          )}

          {/* 生成结果 */}
          {!isGenerating && rightTab === 'result' && (
            <Card className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                {generatedResult ? (
                  <div className="text-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <Image className="w-20 h-20 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedIndustry?.label} - {selectedStyle?.label}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">生成成功！</p>
                    <div className="flex items-center justify-center gap-3">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                        查看详情
                      </button>
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors cursor-pointer">
                        下载图片
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      选择行业和风格
                    </h3>
                    <p className="text-sm text-gray-500">
                      点击「AI 生成图片」按钮，AI 将根据您的选择智能生成电商图片
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* 生成历史 */}
          {!isGenerating && rightTab === 'history' && (
            <Card className="flex-1 overflow-auto">
              <div className="grid grid-cols-5 gap-4">
                {generateHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="p-3 border-t border-gray-100">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {item.industry} - {item.style}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignPlatform;
