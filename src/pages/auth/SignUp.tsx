import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "@/hooks/useAuthState";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<SignUpInput>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setUser } = useAuthState();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const result = signUpSchema.parse({ name, email, password });
      
      // TODO: ここでバックエンドAPIと連携する
      // 仮の実装として、ダミーユーザーで登録する
      const dummyUser = {
        id: "1",
        email: result.email,
        name: result.name,
      };

      setUser(dummyUser);
      toast({
        title: "アカウントを作成しました",
      });
      navigate("/feed");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "エラーが発生しました",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-secondary/5 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">アカウントを作成</h1>
          <p className="text-muted-foreground text-center" id="signup-description">
            AIコミュニティに参加しましょう
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="signup-description">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                type="text"
                placeholder="名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-primary"
                disabled={isLoading}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1" id="name-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary"
                disabled={isLoading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1" id="email-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-primary"
                disabled={isLoading}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1" id="password-error" role="alert">
                  {errors.password}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "作成中..." : "アカウントを作成"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            すでにアカウントをお持ちの方は{" "}
            <Link to="/login" className="text-primary hover:underline">
              ログイン
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;