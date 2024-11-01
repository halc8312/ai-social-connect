import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";

const Messages = () => {
  return (
    <div className="flex h-[calc(100vh-2rem)] gap-4">
      {/* サイドバー：チャットリスト */}
      <div className="w-80 border-r">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="メッセージを検索..."
              className="pl-10"
            />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((chat) => (
              <Card key={chat} className="cursor-pointer hover:bg-accent">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      U
                    </div>
                    <div>
                      <div className="font-semibold">User Name</div>
                      <div className="text-sm text-gray-500">最後のメッセージ...</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* メインチャットエリア */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {[1, 2, 3].map((message) => (
              <div
                key={message}
                className={`flex ${
                  message % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message % 2 === 0
                      ? "bg-primary text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <p>これはサンプルメッセージです。</p>
                  <div className="text-xs mt-1 opacity-70">14:30</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input placeholder="メッセージを入力..." />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;