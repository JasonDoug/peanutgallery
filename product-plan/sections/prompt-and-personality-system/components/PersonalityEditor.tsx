import { useState, useEffect } from 'react'
import type { Personality, PersonalityEditorProps } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Sparkles, 
  Settings, 
  Terminal, 
  Ban, 
  Play, 
  Save, 
  X, 
  MessageSquare, 
  Bot,
  Type,
  History
} from 'lucide-react'

export function PersonalityEditor({
  personality,
  onSave,
  onCancel,
  onTestRun,
  testOutput,
  isSaving
}: PersonalityEditorProps) {
  const [formData, setFormData] = useState<Partial<Personality>>({})
  const [sampleInput, setSampleInput] = useState('What do you think of this movie?')

  useEffect(() => {
    if (personality) {
      setFormData(personality)
    } else {
      setFormData({
        name: '',
        description: '',
        systemPrompt: '',
        temperature: 0.7,
        model: 'gpt-4o',
        tone: 'custom',
        active: true,
        forbiddenTopics: [],
        responseStyleExamples: [],
        outputFormat: 'plain-text'
      })
    }
  }, [personality])

  if (!formData.name && personality === undefined) return null

  const handleChange = (field: keyof Personality, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (formData.name && formData.systemPrompt) {
      onSave(formData as Personality)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            {personality ? 'Edit Personality' : 'Create New Personality'}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">
            Fine-tune how your AI viewing companion behaves and speaks.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !formData.name || !formData.systemPrompt}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-lime-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400">Core Identity</span>
              </div>
              <CardTitle>Identity & Tone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Personality Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="e.g. The Grumpy Critic"
                  className="bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Input 
                  id="description" 
                  value={formData.description} 
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder="A one-sentence summary of this character's vibe."
                  className="bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tone">Base Tone</Label>
                  <select 
                    id="tone"
                    value={formData.tone}
                    onChange={e => handleChange('tone', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300"
                  >
                    <option value="slapstick">Slapstick</option>
                    <option value="dry-humor">Dry Humor</option>
                    <option value="educational">Educational</option>
                    <option value="hype">Hype</option>
                    <option value="supportive">Supportive</option>
                    <option value="technical">Technical</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outputFormat">Output Format</Label>
                  <select 
                    id="outputFormat"
                    value={formData.outputFormat}
                    onChange={e => handleChange('outputFormat', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300"
                  >
                    <option value="plain-text">Plain Text</option>
                    <option value="markdown">Markdown</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="w-4 h-4 text-lime-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400">Behavior Logic</span>
              </div>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>The core instructions that define how the AI responds to the video.</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                className="min-h-[300px] w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-mono ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300"
                value={formData.systemPrompt}
                onChange={e => handleChange('systemPrompt', e.target.value)}
                placeholder="You are an expert film critic with a mean streak. Your goal is to find every plot hole and continuity error..."
              />
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-stone-500">{formData.systemPrompt?.length || 0} characters</span>
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">Markdown Supported</Badge>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="constraints" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-stone-100 dark:bg-stone-950">
              <TabsTrigger value="constraints">Constraints</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            <TabsContent value="constraints" className="mt-4">
              <Card className="border-stone-200 dark:border-stone-800">
                <CardHeader>
                  <CardTitle className="text-lg">Forbidden Topics & Rules</CardTitle>
                  <CardDescription>Topics the AI should never discuss.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.forbiddenTopics?.map(topic => (
                      <Badge key={topic} variant="secondary" className="pl-2 py-1 pr-1 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900/50">
                        {topic}
                        <button 
                          className="ml-1 p-0.5 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors"
                          onClick={() => handleChange('forbiddenTopics', formData.forbiddenTopics?.filter(t => t !== topic))}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    <button className="text-xs text-stone-500 hover:text-lime-600 dark:hover:text-lime-400 flex items-center gap-1 transition-colors">
                      <X className="w-3 h-3 rotate-45" />
                      Add Topic
                    </button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Model Settings</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-stone-500">LLM Model</span>
                        <select 
                          value={formData.model}
                          onChange={e => handleChange('model', e.target.value)}
                          className="flex h-9 w-full rounded-md border border-stone-200 bg-white px-3 py-1 text-xs dark:border-stone-800 dark:bg-stone-950"
                        >
                          <option value="gpt-4o">GPT-4o (Smartest)</option>
                          <option value="gpt-4o-mini">GPT-4o Mini (Fastest)</option>
                          <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-stone-500">Temperature</span>
                          <span className="text-xs font-mono">{formData.temperature}</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={formData.temperature}
                          onChange={e => handleChange('temperature', parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-lime-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="examples" className="mt-4">
              <Card className="border-stone-200 dark:border-stone-800">
                <CardHeader>
                  <CardTitle className="text-lg">Response Style Examples</CardTitle>
                  <CardDescription>Show the AI exactly how you want it to phrase things.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.responseStyleExamples?.map((example, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="flex-1 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md p-3 text-sm italic text-stone-600 dark:text-stone-400">
                        "{example}"
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleChange('responseStyleExamples', formData.responseStyleExamples?.filter((_, idx) => idx !== i))}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full border-dashed">
                    Add Example Phrase
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 shadow-lg sticky top-6">
            <CardHeader className="pb-3 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 mb-1">
                <Play className="w-4 h-4 text-lime-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400">Sandbox</span>
              </div>
              <CardTitle className="text-xl">Test Personality</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-input" className="text-xs uppercase tracking-tighter font-bold opacity-70">Sample Input</Label>
                <textarea
                  id="test-input"
                  className="w-full min-h-[100px] rounded-md border border-stone-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 dark:border-stone-800 dark:bg-stone-900 dark:focus-visible:ring-stone-300"
                  value={sampleInput}
                  onChange={e => setSampleInput(e.target.value)}
                  placeholder="Describe what's happening in the movie..."
                />
              </div>
              <Button 
                className="w-full bg-stone-900 dark:bg-lime-500 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-lime-400"
                onClick={() => onTestRun(formData as Personality, sampleInput)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Run Test
              </Button>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-tighter font-bold opacity-70">AI Response</Label>
                <div className="min-h-[150px] rounded-md border border-stone-200 bg-white dark:bg-stone-900 p-4 text-sm relative overflow-hidden group">
                  {testOutput ? (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-lime-100 dark:bg-lime-950 flex items-center justify-center">
                          <Bot className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">{formData.name}</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed italic">
                        "{testOutput}"
                      </p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 dark:text-stone-600">
                      <Terminal className="w-8 h-8 mb-2 opacity-20" strokeWidth={1} />
                      <p className="text-xs">Output will appear here</p>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <History className="w-3 h-3 mx-auto mb-1 text-stone-400" />
                  <span className="block text-[10px] uppercase font-bold text-stone-500">Used</span>
                  <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100">{formData.usageCount || 0}</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <Sparkles className="w-3 h-3 mx-auto mb-1 text-stone-400" />
                  <span className="block text-[10px] uppercase font-bold text-stone-500">Rating</span>
                  <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100">{formData.averageRating?.toFixed(1) || '0.0'}</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <Type className="w-3 h-3 mx-auto mb-1 text-stone-400" />
                  <span className="block text-[10px] uppercase font-bold text-stone-500">Format</span>
                  <span className="text-[10px] font-mono font-bold text-stone-900 dark:text-stone-100 uppercase">{formData.outputFormat?.split('-')[0]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
