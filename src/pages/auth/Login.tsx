import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "@/hooks/useAuthState";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<LoginInput>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setUser } = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const result = loginSchema.parse({ email, password });
      
      // TODO: ここでバックエンドAPIと連携する
      // 仮の実装として、ダミーユーザーでログインする
      const dummyUser = {
        id: "1",
        email: result.email,
        name: "テストユーザー",
      };

      setUser(dummyUser);
      toast({
        title: "ログインしました",
      });

      const from = location.state?.from?.pathname || "/feed";
      navigate(from);
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
          <h1 className="text-2xl font-bold text-center">おかえりなさい</h1>
          <p className="text-muted-foreground text-center" id="login-description">
            アカウントにログインしてください
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="login-description">
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
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            アカウントをお持ちでない方は{" "}
            <Link to="/signup" className="text-primary hover:underline">
              新規登録
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;