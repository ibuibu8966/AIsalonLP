'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('basic');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // スクロールアニメーション
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: 'プログラミング初心者でも参加できますか？',
      answer: 'はい、初心者歓迎です。基礎から丁寧に解説し、個別サポートも充実しています。週3-5時間の学習時間を確保していただければ、確実にスキルアップできる環境を用意しています。'
    },
    {
      question: 'どのような開発環境が必要ですか？',
      answer: 'Windows 11またはmacOS Catalina以降、メモリ8GB以上を推奨します。また、安定したインターネット接続環境が必要です。具体的な環境構築については、入会後に詳しくご案内いたします。'
    },
    {
      question: 'サポート体制はどうなっていますか？',
      answer: 'Discordでの24時間質問対応、週1回の定期ライブ配信、過去の全配信アーカイブ視聴、個別コードレビューなど、充実したサポート体制を整えています。'
    },
    {
      question: '途中参加でもついていけますか？',
      answer: '可能です。全ての学習コンテンツはアーカイブ化されており、個別のロードマップ作成でキャッチアップを支援します。また、過去の質問や解決事例も検索できるため、効率的に学習を進められます。'
    },
    {
      question: '忙しくて時間が取れない場合は？',
      answer: 'アーカイブ視聴により自分のペースで学習可能です。週3-5時間程度の時間確保を推奨していますが、短時間でも継続することで着実にスキルアップできるカリキュラム設計になっています。'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* スクロール進捗バー */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              AI×プログラミングサロン
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">特徴</Link>
              <Link href="#curriculum" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">カリキュラム</Link>
              <Link href="#instructors" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">講師紹介</Link>
              <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">料金</Link>
              <Link href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">FAQ</Link>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                今すぐ申し込む
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="pt-32 pb-40 min-h-screen relative overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative">
          <div className="fade-in bg-black/40  rounded-3xl p-16 max-w-4xl mx-auto">
            <h1 className="backdrop-blur-md text-6xl md:text-6xl font-black mb-8 leading-tight text-white drop-shadow-lg">
              AI×プログラミングサロン
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 drop-shadow-md backdrop-blur-md">
              <span className="text-yellow-300 font-bold">未来のスキル</span>を身につけ、<span className="text-cyan-300 font-bold">キャリアを加速</span>させよう
            </p>
            
            <div className="mb-12">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <i className="fas fa-heart mr-2"></i>今すぐ始める
              </button>
            </div>

            <div className="backdrop-blur-md flex justify-center gap-8 text-base text-white">
              <div className="flex items-center">
                <i className="fas fa-users text-cyan-300 mr-2 text-lg"></i>
                <span>コミュニティ学習</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-brain text-purple-300 mr-2 text-lg"></i>
                <span>AI専門カリキュラム</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-code text-green-300 mr-2 text-lg"></i>
                <span>実践プログラミング</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 毎日の作業セクション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-gray-400 md:text-4xl font-bold mb-4">
              毎日の作業、もっと<span className="text-blue-500">楽にできるはず</span>なのに...
            </h2>
            <p className="text-gray-600">毎日同じ作業の繰り返しで時間を取られていませんか？</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-robot text-3xl text-red-500"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-400">AIツールが使いこなせない</h3>
              <p className="text-gray-600 text-sm text-center">知っているけど、うまく活用できていない</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl text-white">?</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-400">何から始めればいいかわからない</h3>
              <p className="text-gray-600 text-sm text-center">プログラミングに興味はあるけど、最初の一歩が踏み出せない</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-clock text-3xl text-blue-500"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-400">効率化の方法が見つからない</h3>
              <p className="text-gray-600 text-sm text-center">時間を短縮したいが、具体的な手法がわからない</p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto bg-blue-50 rounded-2xl p-8 text-center fade-in">
            <p className="text-xl mb-4 text-gray-400">
              そんなあなたのために、「<span className="text-blue-600 font-bold">学ぶ</span>」で終わらせない実践的な<br />
              サロンを用意しました。
            </p>
            <p className="text-gray-600">
              明日の業務から使える「<span className="text-amber-500 font-bold">武器</span>」を手に入れて、働き方を変えてみませんか？
            </p>
            <i className="fas fa-arrow-down text-3xl text-blue-500 mt-6 animate-bounce"></i>
          </div>
        </div>
      </section>

      {/* なぜ今、AIとプログラミングなのか */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-400">
              なぜ今、<span className="text-blue-500">AIとプログラミング</span>なのか
            </h2>
            <p className="text-gray-600">
              時代の転換点に立つ今、準備をするかしないで<span className="text-amber-500 font-bold">大きな差</span>が生まれています。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12 fade-in">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-600">変化の波が押し寄せている</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-400">AI革命の到来</h4>
                    <p className="text-gray-600 text-sm">ChatGPTをはじめとする生成AIが業務を劇的に変えている</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-400" >自動化のニーズ</h4>
                    <p className="text-gray-600 text-sm">単純作業を自動化し、創造的な仕事に集中する時代へ</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-400" >スキル格差の拡大</h4>
                    <p className="text-gray-600 text-sm">AI・プログラミングを使える人とそうでない人の差が急拡大</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-400">市場価値の向上</h4>
                    <p className="text-gray-600 text-sm">実装力とAI活用スキルを持つ人材への需要が急上昇</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-center text-gray-400">市場動向</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-400">AI市場成長率</span>
                    <span className="text-blue-600 font-bold">+42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full" style={{width: '42%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-400">プログラマー需要</span>
                    <span className="text-blue-600 font-bold">+25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-400">自動化投資</span>
                    <span className="text-blue-600 font-bold">+60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-100 rounded-2xl p-8 text-center max-w-4xl mx-auto fade-in">
            <p className="text-xl mb-2 text-gray-400">
              今学び始めれば、数年後には圧倒的なアドバンテージを手にできます。
            </p>
            <p className="text-amber-500 font-bold">
              <i className="fas fa-star mr-2"></i>
              早期参入者としての優位性を確立
            </p>
          </div>
        </div>
      </section>

      {/* AIで実際に何ができるようになるのか？ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-400">
              AIで実際に<span className="text-blue-500">何ができるようになる</span>のか？
            </h2>
            <p className="text-gray-600">
              AIは単なるツールではありません。<span className="text-amber-500 font-bold">あなたの能力を何倍にも拡張する武器</span>です。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto fade-in">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center text-gray-400">
                <i className="fas fa-cog text-blue-500 mr-3"></i>
                プロンプト設計をマスターすると
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">要約・抽出・分類・仕様化の型とチェックリストを活用</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">議事録の自動化とポイント抽出</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">データの整理と分析レポート自動生成</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">仕様書の下書きと要件整理の効率化</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 text-gray-400">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <i className="fas fa-lightbulb text-green-500 mr-3"></i>
                実際の活用例
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <i className="fas fa-shopping-cart text-blue-500 mr-2"></i>
                  <span className="font-semibold">楽天の注文履歴を自動抽出・整理</span>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <i className="fas fa-mobile-alt text-purple-500 mr-2"></i>
                  <span className="font-semibold">iPhone明細PDFの自動保存＆文字起こし</span>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <i className="fas fa-envelope text-green-500 mr-2"></i>
                  <span className="font-semibold">Gmail請求書の自動保存と分類</span>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <i className="fas fa-users text-orange-500 mr-2"></i>
                  <span className="font-semibold">会議内容の自動要約とタスク抽出</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center fade-in">
            <p className="text-xl font-bold mb-4 text-blue-600">
              さらに、特化分野での活用も
            </p>
            <p className="text-gray-600 mb-8">
              今後サロンでは、様々な分野でのAI活用ノウハウも展開予定：
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <i className="fas fa-calculator text-blue-500 text-2xl mb-2"></i>
                <p className="font-semibold text-sm text-gray-400">経理×AI</p>
                <p className="text-xs text-gray-600">仕訳の自動化、決算書類の作成支援、経費精算の効率化</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <i className="fas fa-sync text-green-500 text-2xl mb-2"></i>
                <p className="font-semibold text-sm text-gray-400">転売×AI</p>
                <p className="text-xs text-gray-600">商品リサーチの自動化、価格動向分析、出品作業の効率化</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <i className="fas fa-bullhorn text-purple-500 text-2xl mb-2"></i>
                <p className="font-semibold text-sm text-gray-400">アフィリエイト×AI</p>
                <p className="text-xs text-gray-600">コンテンツ生成、SEO分析、案件選定の自動化</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <i className="fas fa-chart-line text-orange-500 text-2xl mb-2"></i>
                <p className="font-semibold text-sm text-gray-400">その他</p>
                <p className="text-xs text-gray-600">マーケティング、HR、不動産投資分析など</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* サロンに入ると、あなたはどう変わる？ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-400">
              サロンに入ると、あなたは<span className="text-blue-500">どう変わる</span>？
            </h2>
            <p className="text-gray-600">
              <span className="text-amber-500 font-bold">30日後、90日後</span>のあなたは今とは全く違うレベルにいます
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                30
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-blue-600">30日後の到達目標</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-rocket text-blue-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">日常タスクの自動化システム1つ完成</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">AI議事録システムの構築と運用開始</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-code text-purple-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">プロンプト設計の基本パターンを習得</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                90
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-green-600">90日後の到達目標</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-times text-red-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">社内で使える実用的なツールを1本公開</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-briefcase text-blue-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">複数の自動化システムを組み合わせた業務フロー構築</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-chart-line text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-700">副業案件に対応できるスキルレベルに到達</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto fade-in">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-600">得られる具体的な変化</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <i className="fas fa-clock text-3xl text-blue-500 mb-3"></i>
                <h4 className="font-bold mb-2">時間の大幅削減</h4>
                <p className="text-sm text-gray-600">毎日2-3時間の時短を実現</p>
              </div>
              <div className="text-center">
                <i className="fas fa-star text-3xl text-yellow-500 mb-3"></i>
                <h4 className="font-bold mb-2">社内評価アップ</h4>
                <p className="text-sm text-gray-600">効率化の提案と実装で存在感向上</p>
              </div>
              <div className="text-center">
                <i className="fas fa-chart-line text-3xl text-green-500 mb-3"></i>
                <h4 className="font-bold mb-2">副業の受注力向上</h4>
                <p className="text-sm text-gray-600">実績とポートフォリオの充実</p>
              </div>
              <div className="text-center">
                <i className="fas fa-gem text-3xl text-purple-500 mb-3"></i>
                <h4 className="font-bold mb-2">将来への投資</h4>
                <p className="text-sm text-gray-600">AI時代に必要不可欠なスキルセット獲得</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              サロンの<span className="text-blue-500">3つの特徴</span>
            </h2>
          </div>

          <div className="space-y-20">
            {/* 特徴1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center fade-in">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 text-xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">
                  AI・生成AI専門カリキュラム
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  最新ツールの"正しい使い方"を厳選し、実務で再現できる型を配布。プロンプト設計から自動化実装まで、段階的に学べる体系化されたカリキュラムです。
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">プロンプト設計チェックリスト（要約・抽出・分類・仕様化）</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">ツール用途マップと比較（検索・要約・表変換・議事録化）</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">楽天注文履歴抽出・iPhone明細PDF自動保存などの実例</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center">
                  <i className="fas fa-brain text-6xl text-blue-500 mb-6"></i>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <span className="text-sm font-semibold text-blue-900">30日後の到達目標</span>
                      <p className="text-sm text-blue-700 mt-2">日常タスクの自動化 + AI議事録システム完成</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <span className="text-sm font-semibold text-green-900">90日後の到達目標</span>
                      <p className="text-sm text-green-700 mt-2">社内で使える実用ツール1本公開</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 特徴2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center fade-in">
              <div className="lg:order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 text-xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">
                  本格プログラミング実装
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  基礎→API連携→運用まで、"動かし続ける"実装力を獲得。例外処理やログ管理まで含めた、現場レベルの開発スキルを身につけます。
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-code text-blue-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">GAS/JavaScript/Pythonでの自動化とAPI連携</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-shield-alt text-green-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">例外処理・ログ・通知（Slack/メール）まで含めた運用設計</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-database text-purple-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">スクレイピング→シート/DB→可視化（定期実行・失敗時リトライ）</span>
                  </div>
                </div>
              </div>
              <div className="lg:order-1 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center">
                  <i className="fas fa-laptop-code text-6xl text-green-500 mb-6"></i>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-400">JavaScript/GAS</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-2 bg-yellow-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-400">Python</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="w-5/6 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-400">API連携</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 特徴3 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center fade-in">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full text-purple-600 text-xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">
                  コミュニティ学習環境
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Discordで"詰まりを最短で解消"し、成果物を積み上げる。質問し放題の環境で、挫折せずに継続的な成長を実現できます。
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fab fa-discord text-purple-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">質問箱・自動化レシピ・制作ギャラリー・ライブ告知チャンネル</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-video text-red-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">ライブ配信＋アーカイブでいつでも復習、質問し放題</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-code-branch text-blue-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">コードレビュー（可読性・保守性・例外処理・運用設計）</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center">
                  <i className="fas fa-users text-6xl text-purple-500 mb-6"></i>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-400">質問対応</span>
                      <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">24時間</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-400">ライブ配信</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">週1回</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-400">コードレビュー</span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full">随時</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* カリキュラムセクション */}
      <section id="curriculum" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              カリキュラム<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">内容</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto fade-in">
            {/* タブナビゲーション */}
            <div className="flex justify-center mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'basic'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                基礎カリキュラム
              </button>
              <button
                onClick={() => setActiveTab('specialized')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'specialized'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                専門分野
              </button>
            </div>

            {/* タブコンテンツ */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {activeTab === 'basic' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">基礎カリキュラム</h3>
                    <p className="text-gray-600">実務で即使えるスキルを段階的に習得</p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h4 className="text-xl font-bold mb-4 text-blue-900">
                        <i className="fas fa-brain mr-3"></i>AI×プロンプト設計
                      </h4>
                      <p className="text-blue-800 mb-4">
                        要約・抽出・分類・仕様化の型とチェックリスト。誤り検出の再質問テンプレ付き。
                      </p>
                      <div className="text-sm text-blue-700">
                        <strong>到達目標：</strong> 30日で「日常タスクの自動化」＋「議事録のAI化」を1つ完成
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-6">
                      <h4 className="text-xl font-bold mb-4 text-green-900">
                        <i className="fas fa-cog mr-3"></i>GASで業務自動化
                      </h4>
                      <p className="text-green-800 mb-4">
                        Gmail/Sheets/Driveの連携。通知、添付保存、表整形、定期実行、失敗時リトライまで。
                      </p>
                      <div className="text-sm text-green-700">
                        <strong>実例：</strong> 楽天注文履歴の自動出力、iPhone明細PDFの自動保存＆文字起こし
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-6">
                      <h4 className="text-xl font-bold mb-4 text-purple-900">
                        <i className="fas fa-spider mr-3"></i>スクレイピング→可視化
                      </h4>
                      <p className="text-purple-800 mb-4">
                        日次収集→表・グラフ更新。例外・ブロック対策、キャッシュ戦略を学習。
                      </p>
                      <div className="text-sm text-purple-700">
                        <strong>到達目標：</strong> 90日で社内/副業向けのツールを1本公開
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specialized' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">専門分野カリキュラム</h3>
                    <p className="text-gray-600">実際のビジネスシーンで活用できる専門知識</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h4 className="text-lg font-bold mb-4 text-blue-900">
                        <i className="fas fa-calculator mr-3"></i>経理×AI
                      </h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li>• 領収書・請求書の自動読み取りと仕訳生成</li>
                        <li>• 勘定科目の自動判定システム</li>
                        <li>• 月次・年次決算資料の自動作成</li>
                        <li>• 経費精算の承認フロー自動化</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-6">
                      <h4 className="text-lg font-bold mb-4 text-green-900">
                        <i className="fas fa-exchange-alt mr-3"></i>転売×AI
                      </h4>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li>• 商品トレンド分析と仕入れ判断支援</li>
                        <li>• 競合価格の自動監視と価格調整</li>
                        <li>• 商品説明文の自動生成</li>
                        <li>• 在庫管理と売上予測</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-6">
                      <h4 className="text-lg font-bold mb-4 text-purple-900">
                        <i className="fas fa-bullhorn mr-3"></i>アフィリエイト×AI
                      </h4>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li>• SEOに最適化されたコンテンツ自動生成</li>
                        <li>• キーワード分析と記事企画の自動化</li>
                        <li>• 成果の良い案件の自動抽出</li>
                        <li>• SNS投稿の自動化とエンゲージメント分析</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 rounded-2xl p-6">
                      <h4 className="text-lg font-bold mb-4 text-amber-900">
                        <i className="fas fa-chart-line mr-3"></i>その他の分野
                      </h4>
                      <ul className="space-y-2 text-sm text-amber-800">
                        <li>• マーケティング自動化</li>
                        <li>• HR・採用支援システム</li>
                        <li>• 不動産投資分析ツール</li>
                        <li>• カスタム業務システム開発</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 講師紹介セクション */}
      <section id="instructors" className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              実績豊富な<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">講師陣</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 fade-in">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    K
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">KIDD</h3>
                  <p className="text-lg text-gray-600">AI・生成AIツール専門講師</p>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  最新のAI技術とツールに精通し、実践的な活用方法を分かりやすく解説。常に最新トレンドをキャッチアップし、本当に使えるAI情報のみを厳選してお届けします。
                </p>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">専門分野:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <i className="fas fa-robot text-blue-500 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-700">AI・生成AIツールの使い方講習と最新動向の紹介</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-question-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-700">ライブQ&Aとデモ・モックアプリの共有</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-broadcast-tower text-purple-500 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-700">定期ライブ配信</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    R
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">R</h3>
                  <p className="text-lg text-gray-600">プログラミング・開発実務講師</p>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  元テックキャンプ講師として豊富な指導経験を持ち、現在は会社経営も手がけるプロフェッショナル。要件定義から本番デプロイまでの実務フローを、実際の開発を通じて指導します。
                </p>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">専門分野:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <i className="fas fa-code text-orange-500 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-700">プロトタイプ開発のライブ解説</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-server text-blue-500 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-700">開発環境構築から本番デプロイまで</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-double text-green-500 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-700">コードレビューと品質管理、実務レベルの開発フロー指導</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    ※「TECH CAMP」は株式会社divの登録商標です。本サロンは同社とは一切関係ありません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">料金プラン</span>
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto fade-in">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-blue-100 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                POPULAR
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">ベーシックプラン</h3>
                <div className="mb-6">
                  <span className="text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">¥2,980</span>
                  <span className="text-xl text-gray-600">/月（税込）</span>
                </div>
                <p className="text-gray-600">全ての機能が含まれています</p>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-6 text-center text-gray-900">含まれるサービス:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">AI・生成AIツールの使い方講習</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">最新動向の紹介とライブQ&A</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">プログラミング基礎解説</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">デモ・モックアプリの共有</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">定期ライブ配信（週1回または月1回）</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">アーカイブ視聴（過去の全配信）</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">Discord質問し放題</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">コードレビューサポート</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">個別最適化アンケート</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span className="text-gray-700">学習ロードマップ提供</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-2 transition-all duration-300 w-full">
                  <i className="fas fa-credit-card mr-3"></i>今すぐ申し込む
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  安全な決済システムで簡単お申し込み
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQセクション */}
      <section id="faq" className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              よくある<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">質問</span>
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4 fade-in">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <i className={`fas fa-chevron-${openFaq === index ? 'up' : 'down'} text-gray-400 transition-transform duration-200`}></i>
                  </div>
                </button>
                <div className={`px-6 pb-4 transition-all duration-200 ${openFaq === index ? 'block' : 'hidden'}`}>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最終CTAセクション */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center fade-in">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                結果が出る学びを、<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">今日から。</span>
              </h2>
              <p className="text-2xl font-bold mb-6 text-amber-600">
                AI×プログラミングで、あなたのキャリアを次のレベルへ。
              </p>
              
              <div className="max-w-3xl mx-auto mb-8">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  「学んだけど使えない」「時間だけが過ぎていく」そんな経験はもう終わりです。
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  このサロンでは、<strong className="text-blue-600">学んだその日から実践できる</strong>実用的なスキルを身につけられます。週3〜5時間の学習で、"動く成果物"が確実に積み上がっていきます。
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  作業時間の削減・社内評価アップ・副業の受注力向上・ポートフォリオ充実を現実のものにしましょう。
                </p>
              </div>
              
              <div className="mb-12">
                <p className="text-xl font-bold text-blue-600">
                  今始めれば、3ヶ月後には周りから頼られる存在になっています。
                </p>
              </div>
              
              <div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-16 py-6 text-2xl font-bold rounded-full shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-2 transition-all duration-300 mb-6">
                  <i className="fas fa-rocket mr-4"></i>お申し込みはこちら
                </button>
                
                <div className="flex justify-center space-x-6 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-green-500 mr-2"></i>
                    <span>安全な決済</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-headset text-blue-500 mr-2"></i>
                    <span>充実サポート</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-purple-500 mr-2"></i>
                    <span>いつでも学習</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">AI×プログラミングサロン</h3>
            <p className="text-gray-400">未来のスキルを身につけ、キャリアを加速させよう</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            <i className="fab fa-discord text-2xl text-purple-400 hover:scale-110 transition-transform cursor-pointer"></i>
            <i className="fab fa-twitter text-2xl text-blue-400 hover:scale-110 transition-transform cursor-pointer"></i>
            <i className="fab fa-youtube text-2xl text-red-400 hover:scale-110 transition-transform cursor-pointer"></i>
          </div>
          
          <p className="text-gray-400 text-sm">
            © 2024 AI×プログラミングサロン. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
      />

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
        /* ホバーエフェクト */
        .hover\\:-translate-y-2:hover {
          transform: translateY(-8px);
        }
        
        .hover\\:-translate-y-1:hover {
          transform: translateY(-4px);
        }
        
        /* アニメーション遅延 */
        .fade-in:nth-child(1) { animation-delay: 0.1s; }
        .fade-in:nth-child(2) { animation-delay: 0.2s; }
        .fade-in:nth-child(3) { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
