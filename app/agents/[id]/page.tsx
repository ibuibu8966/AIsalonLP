'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface AgentData {
  id: string;
  name: string;
  description: string;
  specialties: string[];
  capabilities: string[];
  pricing: string;
  rating: number;
  responseTime: string;
  accuracy: string;
}

const agentData: { [key: string]: AgentData } = {
  '1': {
    id: '1',
    name: 'データ分析エージェント',
    description: '高度なデータ分析と可視化を専門とするAIエージェント。ビジネスインテリジェンスとデータドリブンな意思決定をサポートします。',
    specialties: ['データ分析', '統計処理', '予測モデリング', 'レポート生成'],
    capabilities: [
      'CSV、Excel、JSONファイルの自動処理',
      'リアルタイムデータの監視と分析',
      'インタラクティブなダッシュボード生成',
      '機械学習モデルによる予測分析',
      'カスタムレポートの自動作成'
    ],
    pricing: '月額 ¥15,000',
    rating: 4.8,
    responseTime: '0.2s',
    accuracy: '96%'
  },
  '2': {
    id: '2',
    name: 'コンテンツ生成エージェント',
    description: '創造的なコンテンツ制作を専門とするAIエージェント。ブログ記事、マーケティングコピー、SNS投稿など多様なコンテンツを生成します。',
    specialties: ['文章作成', 'SEO最適化', 'コピーライティング', '多言語対応'],
    capabilities: [
      'SEO最適化されたブログ記事の生成',
      'ソーシャルメディア向けコンテンツ作成',
      'プレスリリースとニュース記事の執筆',
      '多言語での翻訳と文書作成',
      'ブランドトーンに合わせたライティング'
    ],
    pricing: '月額 ¥12,000',
    rating: 4.9,
    responseTime: '0.3s',
    accuracy: '94%'
  },
  '3': {
    id: '3',
    name: 'カスタマーサポートエージェント',
    description: '24時間365日のカスタマーサポートを提供するAIエージェント。多言語対応でスケーラブルな顧客対応を実現します。',
    specialties: ['顧客対応', 'チャットボット', '多言語サポート', '問題解決'],
    capabilities: [
      '自然言語による顧客問い合わせの理解',
      'FAQからの適切な回答の提供',
      'エスカレーションが必要な問題の識別',
      '顧客満足度の追跡と分析',
      '複数チャネルでの統合サポート'
    ],
    pricing: '月額 ¥8,000',
    rating: 4.7,
    responseTime: '0.1s',
    accuracy: '92%'
  },
  '4': {
    id: '4',
    name: '財務管理エージェント',
    description: '企業の財務データを管理・分析するAIエージェント。帳簿管理から財務レポート作成まで幅広くサポートします。',
    specialties: ['会計処理', '財務分析', '予算管理', 'レポート作成'],
    capabilities: [
      '請求書とレシートの自動データ入力',
      '月次・年次財務レポートの生成',
      'キャッシュフロー分析と予測',
      '税務計算と申告書の準備',
      'ROI分析とコスト最適化の提案'
    ],
    pricing: '月額 ¥18,000',
    rating: 4.6,
    responseTime: '0.4s',
    accuracy: '98%'
  },
  '5': {
    id: '5',
    name: 'プロジェクト管理エージェント',
    description: 'プロジェクトの計画から実行まで一括管理するAIエージェント。チームの生産性向上と効率的なワークフロー構築を支援します。',
    specialties: ['プロジェクト計画', 'タスク管理', 'リソース配分', '進捗追跡'],
    capabilities: [
      'プロジェクトスケジュールの自動生成',
      'タスクの優先順位付けと割り当て',
      'リスクの早期発見とアラート',
      'チーム間のコミュニケーション促進',
      'プロジェクト成果の分析と改善提案'
    ],
    pricing: '月額 ¥10,000',
    rating: 4.5,
    responseTime: '0.3s',
    accuracy: '90%'
  },
  '6': {
    id: '6',
    name: 'マーケティング戦略エージェント',
    description: 'デジタルマーケティング戦略の立案と実行をサポートするAIエージェント。データドリブンな施策でROI最大化を実現します。',
    specialties: ['デジタルマーケティング', 'キャンペーン最適化', 'SEO/SEM', 'SNS戦略'],
    capabilities: [
      'ターゲット市場の分析と顧客ペルソナ作成',
      'マーケティングキャンペーンの企画と実行',
      'A/Bテストによる施策最適化',
      'ROI分析とマーケティング予算配分',
      '競合他社の動向分析と差別化戦略'
    ],
    pricing: '月額 ¥20,000',
    rating: 4.8,
    responseTime: '0.5s',
    accuracy: '93%'
  }
};

export default function AgentDetail({ params }: { params: { id: string } }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const agent = agentData[params.id];

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

  if (!agent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* スクロール進捗バー */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-white/20 z-40">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GenSpark AI
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                <i className="fas fa-arrow-left mr-2"></i>戻る
              </Link>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                利用開始
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* エージェント概要セクション */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                A{params.id}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {agent.name}
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {agent.description}
              </p>
            </div>

            {/* 統計情報 */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{agent.rating}</div>
                <div className="text-sm text-gray-600">評価</div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i 
                      key={star}
                      className={`fas fa-star text-sm ${
                        star <= Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{agent.responseTime}</div>
                <div className="text-sm text-gray-600">応答速度</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{agent.accuracy}</div>
                <div className="text-sm text-gray-600">精度</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{agent.pricing}</div>
                <div className="text-sm text-gray-600">料金</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* タブナビゲーション */}
      <section className="bg-white/50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-8">
              {[
                { id: 'overview', label: '概要', icon: 'fas fa-info-circle' },
                { id: 'capabilities', label: '機能', icon: 'fas fa-cogs' },
                { id: 'pricing', label: '料金', icon: 'fas fa-credit-card' },
                { id: 'demo', label: 'デモ', icon: 'fas fa-play' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* タブコンテンツ */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    専門分野
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {agent.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <i className="fas fa-check-circle text-green-500 mr-3"></i>
                        <span className="font-medium">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    エージェントの特徴
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      このAIエージェントは、最新の機械学習技術と自然言語処理を組み合わせて、
                      高度な{agent.specialties[0]}を提供します。ユーザーのニーズに応じてカスタマイズ可能で、
                      継続的な学習により性能が向上し続けます。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      セキュリティとプライバシーを最優先に設計されており、
                      エンタープライズレベルでの運用にも対応しています。
                      24時間365日の安定した動作を保証し、スケーラブルなアーキテクチャで
                      ビジネスの成長に合わせて拡張できます。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'capabilities' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  主な機能・能力
                </h3>
                <div className="space-y-6">
                  {agent.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{capability}</h4>
                        <p className="text-gray-600 text-sm">
                          高度なAI技術により、効率的で正確な処理を実現します。
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  料金プラン
                </h3>
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{agent.pricing}</div>
                  <p className="text-gray-600">すべての機能が含まれています</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4">含まれる内容:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        <span>無制限のクエリ処理</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        <span>24時間サポート</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        <span>API統合</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        <span>カスタマイズ対応</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-4">特典:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-2"></i>
                        <span>30日間無料トライアル</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-2"></i>
                        <span>専任サポート担当</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-2"></i>
                        <span>優先アップデート</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-2"></i>
                        <span>導入コンサルティング</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-all mr-4">
                    無料トライアル開始
                  </button>
                  <button className="border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all">
                    詳細資料請求
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'demo' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ライブデモ
                </h3>
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-gray-400 text-sm">AI エージェント デモ</div>
                  </div>
                  <div className="text-green-400 font-mono text-sm">
                    <div className="mb-2">$ ai-agent --query "売上データを分析して"</div>
                    <div className="text-white mb-2">Processing your request...</div>
                    <div className="text-blue-400 mb-2">✓ データを読み込み中</div>
                    <div className="text-blue-400 mb-2">✓ 分析を実行中</div>
                    <div className="text-blue-400 mb-4">✓ レポートを生成中</div>
                    <div className="text-white">
                      分析完了: 売上は前月比15%増加しています。<br/>
                      詳細レポートを生成しました。
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-4">実際のパフォーマンスを体験してみませんか？</p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-all">
                    インタラクティブデモを試す
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {agent.name}を今すぐ始めませんか？
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            30日間の無料トライアルで、AIエージェントの真の力を体験してください
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-white/25 hover:-translate-y-1 transition-all duration-300 mr-4">
            無料トライアル開始
          </button>
          <button className="border-2 border-white text-white px-10 py-4 text-lg font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
            営業担当と相談
          </button>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GenSpark AI
            </Link>
          </div>
          <p className="text-gray-400">© 2024 GenSpark AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
      />
    </div>
  );
}