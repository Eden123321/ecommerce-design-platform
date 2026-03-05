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
  Layers,
  Save,
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

// 底模选项
const baseModels = [
  { id: 'sdxl', label: 'SDXL' },
  { id: 'flux2-kein', label: 'Flux2-Kein' },
  { id: 'qwen2509', label: 'Qwen2509' },
  { id: 'qwen2511', label: 'Qwen2511' },
];

// 设计模板选项
// type: text2image(文生图) | image2image(图生图) | smart(智能 - 根据是否有图片判断)
const designTemplates = [
  {
    id: 'default',
    label: '默认模板',
    type: 'smart',
    preset: {
      baseModel: 'flux2-kein',
      prompt: '',
      industry: 'ecommerce',
      style: 'modern',
      ratio: '1:1',
    }
  },
  {
    id: 'promotion',
    label: '促销模板',
    type: 'text2image',
    preset: {
      baseModel: 'sdxl',
      prompt: '电商促销海报，醒目促销文字，现代简约风格，高对比度，吸睛设计',
      industry: 'ecommerce',
      style: 'modern',
      ratio: '16:9',
    }
  },
  {
    id: 'product',
    label: '商品展示',
    type: 'image2image',
    preset: {
      baseModel: 'flux2-kein',
      prompt: '精致商品展示，专业摄影棚光效，简洁背景，突出产品细节',
      industry: 'ecommerce',
      style: 'flat',
      ratio: '1:1',
      referenceImage: null, // 模板预设的参考图，可为空
    }
  },
  {
    id: 'poster',
    label: '海报模板',
    type: 'image2image',
    preset: {
      baseModel: 'flux2-kein',
      prompt: '创意海报设计，艺术感强，视觉冲击力强，层次分明',
      industry: 'ecommerce',
      style: 'modern',
      ratio: '9:16',
    }
  },
  {
    id: 'banner',
    label: 'Banner模板',
    type: 'text2image',
    preset: {
      baseModel: 'sdxl',
      prompt: '电商 Banner 广告，轮播图设计，促销氛围浓厚，色彩鲜艳',
      industry: 'ecommerce',
      style: 'playful',
      ratio: '16:9',
    }
  },
  {
    id: 'social',
    label: '社交媒体',
    type: 'smart',
    preset: {
      baseModel: 'qwen2509',
      prompt: '社交媒体配图，时尚潮流，适合小红书、微博等平台',
      industry: 'fashion',
      style: 'minimal',
      ratio: '1:1',
    }
  },
  {
    id: 'logo',
    label: '品牌Logo',
    type: 'text2image',
    preset: {
      baseModel: 'flux2-kein',
      prompt: '品牌 Logo 设计，简洁大方，现代简约风格，适合各种场景使用',
      industry: 'home',
      style: 'luxury',
      ratio: '1:1',
    }
  },
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

// LoRA模型选项 - 从模型库获取
const loraOptions = [
  { id: 1, name: '电商主图通用风格', baseModel: 'SDXL' },
  { id: 2, name: '促销活动Banner', baseModel: 'Flux2-Kein' },
  { id: 3, name: '高端品牌Logo', baseModel: 'Qwen2511' },
  { id: 4, name: '活动海报风格', baseModel: 'SDXL' },
  { id: 5, name: '社交媒体封面', baseModel: 'Flux2-Kein' },
  { id: 6, name: 'Banner广告模板', baseModel: 'Qwen2509' },
  { id: 7, name: '美妆产品展示', baseModel: 'SDXL' },
  { id: 8, name: '品牌VI设计', baseModel: 'Flux2-Kein' },
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

const DesignPlatform = ({ designParams, setDesignParams, onOpenBatchModal }) => {
  const [selectedBaseModel, setSelectedBaseModel] = useState(baseModels[0]); // 默认选择第一个底模
  const [selectedLora, setSelectedLora] = useState({ id: 'none', name: '不使用lora', baseModel: '' }); // 选中的LoRA
  const [loraDropdownOpen, setLoraDropdownOpen] = useState(false); // LoRA下拉框状态
  const [selectedTemplate, setSelectedTemplate] = useState(designTemplates[0]); // 默认选择第一个模板
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false); // 设计模板下拉框状态
  const [baseModelDropdownOpen, setBaseModelDropdownOpen] = useState(false); // 底模下拉框状态
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState(null); // 参考图（模板预设或用户上传）
  const [productImage, setProductImage] = useState(null); // 产品图（用户上传，必选）
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [generatedResult, setGeneratedResult] = useState(null);
  const [rightTab, setRightTab] = useState('result'); // 'result' | 'history'
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState('');

  // 保存为模板
  const handleSaveAsTemplate = () => {
    if (!templateName.trim()) return;

    // 创建新模板
    const newTemplate = {
      id: `custom-${Date.now()}`,
      label: templateName,
      type: 'smart',
      preset: {
        baseModel: selectedBaseModel?.id || 'flux2-kein',
        prompt: prompt,
        industry: selectedIndustry?.id || 'ecommerce',
        style: selectedStyle?.id || 'modern',
        ratio: selectedAspectRatio,
      }
    };

    // 这里可以保存到父组件或本地存储
    console.log('保存模板:', newTemplate);
    setShowSaveTemplateModal(false);
    setTemplateName('');
    alert('模板保存成功！');
  };

  // 判断当前是否需要显示图片上传区域
  const shouldShowImageUpload = selectedTemplate?.type === 'image2image' ||
    (selectedTemplate?.type === 'smart' && (referenceImage || productImage));
  const fileInputRef = useRef(null);
  const productImageInputRef = useRef(null);
  const templateDropdownRef = useRef(null);
  const loraDropdownRef = useRef(null);
  const baseModelDropdownRef = useRef(null);

  // 初始化时从 designParams 填充值（只有当值不同时才更新）
  const initKey = useRef(0);
  useEffect(() => {
    if (designParams) {
      // 用递增的key来确保初始化只执行一次
      initKey.current += 1;
      const currentKey = initKey.current;

      // 使用 setTimeout 延迟执行，确保在同步 effect 之前运行
      const timer = setTimeout(() => {
        // 只在 key 没有变化时才更新（确保是同一次初始化）
        if (initKey.current === currentKey) {
          if (designParams.baseModel) {
            setSelectedBaseModel(designParams.baseModel);
          }
          if (designParams.industry) {
            setSelectedIndustry(designParams.industry);
          }
          if (designParams.style) {
            setSelectedStyle(designParams.style);
          }
          if (designParams.ratio) {
            setSelectedAspectRatio(designParams.ratio);
          }
          if (designParams.template) {
            setSelectedTemplate(designParams.template);
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [designParams]);

  // 同步 designParams 到父组件 - 使用延迟避免循环
  const isInitialSync = useRef(true);
  useEffect(() => {
    // 延迟同步，避免初始化时的循环
    const timer = setTimeout(() => {
      isInitialSync.current = false;
      if (setDesignParams) {
        setDesignParams({
          industry: selectedIndustry,
          style: selectedStyle,
          ratio: selectedAspectRatio,
          baseModel: selectedBaseModel,
          template: selectedTemplate,
          prompt: prompt,
          referenceImage: referenceImage,
          productImage: productImage,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedIndustry, selectedStyle, selectedAspectRatio, selectedBaseModel, selectedTemplate, prompt, referenceImage, productImage, setDesignParams]);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (templateDropdownRef.current && !templateDropdownRef.current.contains(event.target)) {
        setTemplateDropdownOpen(false);
      }
      if (loraDropdownRef.current && !loraDropdownRef.current.contains(event.target)) {
        setLoraDropdownOpen(false);
      }
      if (baseModelDropdownRef.current && !baseModelDropdownRef.current.contains(event.target)) {
        setBaseModelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 选择模板时自动填充预设参数
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);

    if (template.preset) {
      const { baseModel, prompt: templatePrompt, industry, style, ratio, referenceImage: templateRefImage } = template.preset;

      // 设置底模
      const matchedBaseModel = baseModels.find(m => m.id === baseModel) || baseModels[0];
      setSelectedBaseModel(matchedBaseModel);

      // 设置提示词（始终填充）
      if (templatePrompt) {
        setPrompt(templatePrompt);
      }

      // 设置行业
      const matchedIndustry = industries.find(i => i.id === industry);
      if (matchedIndustry) {
        setSelectedIndustry(matchedIndustry);
      }

      // 设置风格
      const matchedStyle = styleOptions.find(s => s.id === style);
      if (matchedStyle) {
        setSelectedStyle(matchedStyle);
      }

      // 设置图片比例
      setSelectedAspectRatio(ratio || '1:1');

      // 设置参考图（如果有预设）
      if (templateRefImage) {
        setReferenceImage(templateRefImage);
      } else {
        setReferenceImage(null);
      }

      // 清空产品图
      setProductImage(null);
    }

    setTemplateDropdownOpen(false);
  };

  // 参考图上传处理
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

  // 产品图上传处理
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProductImage = () => {
    setProductImage(null);
    if (productImageInputRef.current) {
      productImageInputRef.current.value = '';
    }
  };

  const handleProductImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedIndustry || !selectedStyle) {
      alert('请至少选择行业和风格');
      return;
    }

    // 图生图模板需要上传产品图
    if (selectedTemplate?.type === 'image2image' && !productImage) {
      alert('请上传产品图');
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
    <div className="p-6 h-full animate-fade-in-up">
      <div className="flex gap-6 h-full">
        {/* 左侧 - 用户输入区域 */}
        <div className="w-[480px] flex-shrink-0">
          <Card className="h-full">
            <div className="flex flex-col h-full">
              <div className="space-y-6 flex-1 overflow-auto pr-4 scrollbar-thin">
                {/* 设计模板 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">设计模板</label>
                  <div className="relative" ref={templateDropdownRef}>
                    <button
                      onClick={() => {
                        setTemplateDropdownOpen(!templateDropdownOpen);
                        if (!templateDropdownOpen) setBaseModelDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {selectedTemplate?.label}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${templateDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {/* 下拉选项 - 使用条件渲染控制显示/隐藏 */}
                    <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-auto transition-all duration-150 origin-top ${templateDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      {/* 模板分组 */}
                      <div className="p-2">
                        <div className="text-xs font-medium text-gray-400 mb-2 px-2">选择模板</div>
                        {designTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => handleSelectTemplate(template)}
                            className={`
                              w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-gray-50 transition-colors cursor-pointer
                              ${selectedTemplate?.id === template.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'}
                            `}
                          >
                            {template.label}
                            <span className="ml-2 text-xs text-gray-400">
                              {template.type === 'text2image' ? '文生图' : template.type === 'image2image' ? '图生图' : '智能'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 模型选择 - 独立下拉框 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">模型</label>
                  <div className="relative" ref={baseModelDropdownRef}>
                    <button
                      onClick={() => {
                        setBaseModelDropdownOpen(!baseModelDropdownOpen);
                        if (!baseModelDropdownOpen) setTemplateDropdownOpen(false);
                      }}
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
                          className={`
                            w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors cursor-pointer
                            ${selectedBaseModel?.id === model.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'}
                          `}
                        >
                          {model.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LoRA选择 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    LoRA <span className="text-gray-400 font-normal text-xs">(可选)</span>
                  </label>
                  <div className="relative" ref={loraDropdownRef}>
                    <button
                      onClick={() => {
                        setLoraDropdownOpen(!loraDropdownOpen);
                        if (!loraDropdownOpen) {
                          setBaseModelDropdownOpen(false);
                          setTemplateDropdownOpen(false);
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {selectedLora ? selectedLora.name : '选择LoRA模型'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${loraDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-150 origin-top max-h-60 overflow-y-auto ${loraDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      {/* 不选择LoRA的选项 */}
                      <button
                        onClick={() => {
                          setSelectedLora({ id: 'none', name: '不使用lora', baseModel: '' });
                          setLoraDropdownOpen(false);
                        }}
                        className={`
                          w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors cursor-pointer
                          ${selectedLora?.id === 'none' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'}
                        `}
                      >
                        不使用LoRA
                      </button>
                      {loraOptions.map((lora) => (
                        <button
                          key={lora.id}
                          onClick={() => {
                            setSelectedLora(lora);
                            setLoraDropdownOpen(false);
                          }}
                          className={`
                            w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between
                            ${selectedLora?.id === lora.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'}
                          `}
                        >
                          <span>{lora.name}</span>
                          <span className="text-xs text-gray-400">{lora.baseModel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 上传参考图 - 图生图或智能模板显示 */}
                {shouldShowImageUpload && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">上传参考图（可选）</label>
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
                        <span className="text-sm text-gray-500">点击或拖拽上传参考图</span>
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
                )}

                {/* 上传产品图 - 图生图模板必选 */}
                {selectedTemplate?.type === 'image2image' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      上传产品图 <span className="text-red-500">*</span>
                    </label>
                    {productImage ? (
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={productImage} alt="产品图" className="w-full h-full object-cover" />
                        <button
                          onClick={handleRemoveProductImage}
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDrop={handleProductImageDrop}
                        onDragOver={handleDragOver}
                        onClick={() => productImageInputRef.current?.click()}
                        className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">点击或拖拽上传产品图</span>
                        <span className="text-xs text-gray-400 mt-1">支持 JPG、PNG 格式</span>
                      </div>
                    )}
                    <input
                      ref={productImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageChange}
                      className="hidden"
                    />
                  </div>
                )}

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

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!selectedIndustry && !selectedStyle) || (selectedTemplate?.type === 'image2image' && !productImage)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer
                    ${(!selectedIndustry || !selectedStyle) || (selectedTemplate?.type === 'image2image' && !productImage)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-primary-600 text-white hover:from-primary-700 hover:to-primary-700 shadow-lg shadow-primary-500/25'
                    }
                  `}
                >
                  <Sparkles className="w-5 h-5" />
                  {isGenerating ? '生成中...' : 'AI 生成图片'}
                </button>
                <button
                  onClick={onOpenBatchModal}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                >
                  <Layers className="w-5 h-5" />
                  批量任务
                </button>
              </div>
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
                    <div className="w-64 h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mx-auto mb-4 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                      <Image className="w-20 h-20 text-primary-600" />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors cursor-pointer">
                        下载图片
                      </button>
                      <button
                        onClick={() => setShowSaveTemplateModal(true)}
                        className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        保存为模板
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

      {/* 保存为模板弹窗 */}
      {showSaveTemplateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowSaveTemplateModal(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">保存为模板</h3>
                <button
                  onClick={() => setShowSaveTemplateModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    模板名称
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="请输入模板名称"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    autoFocus
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="text-xs text-gray-500">当前参数：</div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">底模：</span>{selectedBaseModel?.label || '默认'}
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">行业：</span>{selectedIndustry?.label || '未选择'}
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">风格：</span>{selectedStyle?.label || '未选择'}
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">比例：</span>{selectedAspectRatio}
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">提示词：</span>{prompt || '无'}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowSaveTemplateModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSaveAsTemplate}
                    disabled={!templateName.trim()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignPlatform;
